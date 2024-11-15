import { BaseNode } from './BaseNode';

export const CustomFunctionNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Custom Function"
      description="Define your custom function here."
      fields={[
        { name: 'functionName', label: 'Function Name', type: 'text', default: `func_${id}` },
        { name: 'parameters', label: 'Parameters', type: 'text', default: 'param1, param2' },
        { name: 'returnType', label: 'Return Type', type: 'select', options: [
          { value: 'void', label: 'Void' },
          { value: 'number', label: 'Number' },
          { value: 'string', label: 'String' },
          { value: 'boolean', label: 'Boolean' },
        ], default: 'void' },
      ]}
      inputHandles={[
        { id: `${id}-input`, position: 'left' },
      ]}
      outputHandles={[
        { id: `${id}-output`, position: 'right' },
      ]}
    />
  );
}; 