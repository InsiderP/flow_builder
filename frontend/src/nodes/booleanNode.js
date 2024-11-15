import { BaseNode } from './BaseNode';

export const BooleanNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Boolean"
      fields={[
        { name: 'booleanName', label: 'Name', type: 'text', default: `boolean_${id}` },
        { name: 'defaultValue', label: 'Default Value', type: 'select', options: [
          { value: 'true', label: 'True' },
          { value: 'false', label: 'False' },
        ], default: 'false' },
      ]}
      outputHandles={[
        { id: `${id}-output`, position: 'right' },
      ]}
    />
  );
}; 