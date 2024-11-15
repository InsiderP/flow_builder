// outputNode.js

import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={[
        { name: 'outputName', label: 'Name', type: 'text', default: `output_${id}` },
        { name: 'outputType', label: 'Type', type: 'select', options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
        ], default: 'Text' },
      ]}
      inputHandles={[
        { id: `${id}-value`, position: 'left' },
      ]}
    />
  );
};
