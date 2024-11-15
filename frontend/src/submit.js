// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            // Create user-friendly alert message
            const message = `Pipeline Analysis:\n
                Number of Nodes: ${data.num_nodes}\n
                Number of Edges: ${data.num_edges}\n
                Is DAG: ${data.is_dag ? 'Yes' : 'No'}`;
            
            alert(message);
        } catch (error) {
            alert('Error submitting pipeline: ' + error.message);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
