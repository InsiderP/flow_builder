import { useState, useEffect, useMemo, useCallback } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow"

export const BaseNode = ({
  id,
  data,
  title,
  description,
  fields = [],
  inputHandles: initialInputHandles = [],
  outputHandles = [],
}) => {
  const updateNodeInternals = useUpdateNodeInternals();

  // Manage state for each field
  const [fieldValues, setFieldValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = data[field.name] || field.default || "";
      return acc;
    }, {})
  );

  const handleFieldChange = (e, fieldName) => {
    setFieldValues({
      ...fieldValues,
      [fieldName]: e.target.value,
    });
  };

  // Regex pattern to detect {{identifier}}
  const inputPattern = /\{\{(\w+)\}\}/g;



  // Input Handles
  const inputHandles = useMemo(() => {
    const newHandles = [...initialInputHandles];

    Object.values(fieldValues).forEach((value) => {
      if (typeof value === "string") {
        const matches = [...value.matchAll(inputPattern)];
        matches.forEach((match) => {
          const handleId = match[1];
          if (!newHandles.some((handle) => handle.id === handleId)) {
            newHandles.push({
              id: handleId,
              position: Position.Left,
              type: 'target',
              isConnectable: true,
              style: { background: '#555' }
            });
          }
        });
      }
    });

    return newHandles;
  }, [fieldValues, initialInputHandles]);

  const inputHandlesElements = useMemo(
    () =>
      inputHandles.map((handle, index) => (
        <Handle
          key={`handle-${handle.id}`}
          type={handle.type || "target"}
          position={handle.position || Position.Left}
          id={handle.id}
          style={{ 
            top: `${20 + (index * 20)}px`,
            ...handle.style 
          }}
          isConnectable={true}
          onConnect={(params) => console.log('Connected:', params)}
        />
      )),
    [inputHandles]
  );

  // Update node internals whenever input handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [inputHandles, id, updateNodeInternals]);

  return (
    <div
      style={{
        width: 200,
        minHeight: 80,
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Node Title */}
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{title}</div>

      {/* Input Handles */}
      {inputHandlesElements}

      {/* Description or Additional Content */}
      {description && <div style={{ marginBottom: "10px" }}>{description}</div>}

      {/* Dynamic Fields */}
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            {field.label}:
          </label>
          {field.type === "text" && (
            <textarea
              type="text"
              value={fieldValues[field.name]}
              onChange={(e) => handleFieldChange(e, field.name)}
              style={{  padding: "4px" }}
            />
          )}
          {field.type === "select" && (
            <select
              value={fieldValues[field.name]}
              onChange={(e) => handleFieldChange(e, field.name)}
              style={{ width: "100%", padding: "4px" }}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      {/* Output Handles */}
      {outputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={handle.position || Position.Right}
          id={handle.id || `${id}-output`}
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};
