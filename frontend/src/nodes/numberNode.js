import { BaseNode } from './BaseNode';

export const NumberNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Number"
      fields={[
        { name: 'numberName', label: 'Name', type: 'text', default: `number_${id}` },
        { name: 'minValue', label: 'Min Value', type: 'text', default: '0' },
        { name: 'maxValue', label: 'Max Value', type: 'text', default: '100' },
      ]}
      outputHandles={[
        { id: `${id}-output`, position: 'right' },
      ]}
    />
  );
}; 