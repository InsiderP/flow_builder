// textNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[
        { name: 'text', label: 'Text', type: 'text', default: '' },
      ]}
      outputHandles={[
        { id: `${id}-output`, position: Position.Right },
      ]}
    />
  );
};
