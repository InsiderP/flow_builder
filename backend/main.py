from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
import networkx as nx

app = FastAPI()

# Configure CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this if your frontend runs on a different host or port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        # Parse the pipeline JSON
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Create a directed graph
        G = nx.DiGraph()
        for node in nodes:
            G.add_node(node['id'])
        for edge in edges:
            source = edge.get('source')
            target = edge.get('target')
            if source and target:
                G.add_edge(source, target)
        
        # Check if the graph is a DAG
        is_dag = nx.is_directed_acyclic_graph(G)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except json.JSONDecodeError:
        return {
            'error': 'Invalid JSON format for pipeline.'
        }
    except Exception as e:
        return {
            'error': f'An error occurred: {str(e)}'
        }