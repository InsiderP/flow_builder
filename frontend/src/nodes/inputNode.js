// inputNode.js

import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={[
        { name: 'inputName', label: 'Name', type: 'text', default: `input_${id}` },
        { name: 'inputType', label: 'Type', type: 'select', options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ], default: 'Text' },
      ]}
      outputHandles={[
        { id: `${id}-value`, position: 'right' },
      ]}
    />
  );
};
