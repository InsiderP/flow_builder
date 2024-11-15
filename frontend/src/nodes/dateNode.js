import { BaseNode } from './BaseNode';

export const DateNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Date"
      fields={[
        { name: 'dateName', label: 'Name', type: 'text', default: `date_${id}` },
        { name: 'dateFormat', label: 'Format', type: 'select', options: [
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        ], default: 'MM/DD/YYYY' },
      ]}
      outputHandles={[
        { id: `${id}-output`, position: 'right' },
      ]}
    />
  );
}; 