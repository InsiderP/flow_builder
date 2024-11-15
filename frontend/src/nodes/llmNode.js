// llmNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      description="This is a LLM."
      inputHandles={[
        { id: `${id}-system`, position: Position.Left, style: { top: '33%' } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: '66%' } },
      ]}
      outputHandles={[
        { id: `${id}-response`, position: Position.Right },
      ]}
    />
  );
};
