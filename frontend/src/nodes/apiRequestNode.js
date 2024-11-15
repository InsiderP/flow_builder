import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      description="Configure your API request here."
      fields={[
        { name: 'endpoint', label: 'Endpoint', type: 'text', default: 'https://api.example.com' },
        { name: 'method', label: 'Method', type: 'select', options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ], default: 'GET' },
      ]}
      inputHandles={[
        { id: `${id}-input`, position: 'left' },
      ]}
      outputHandles={[
        { id: `${id}-response`, position: 'right' },
      ]}
    />
  );
}; 