import React, { useState } from "react";
import styled from "styled-components";
import { Trash2, Plus } from "lucide-react";

interface TreeNode {
  id: string;
  label: string;
  readOnly: boolean;
  children?: TreeNode[];
}

interface PortTemplateProps {
  initialData?: TreeNode[];
}

const PortTemplateContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    sans-serif;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 24px;
  background: #ffffff;
  overflow-y: auto;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
`;

const AddRootButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #646cff;
    transform: translateY(-1px);
  }
`;

const TreeContainer = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  min-height: calc(100vh - 240px);
`;

const TreeNodeWrapper = styled.div<{ $level: number }>`
  margin: 4px 0;
  margin-left: ${(props) => props.$level * 24}px;
`;

const NodeContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  transition: all 0.2s;
  min-height: 44px;

  &:hover {
    border-color: #646cff;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const NodeLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ExpandButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
    color: #374151;
  }
`;

const ExpandSpacer = styled.span`
  width: 24px;
  display: inline-block;
`;

const NodeLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  user-select: none;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const NodeLabelInput = styled.input`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  border: 1px solid #646cff;
  border-radius: 4px;
  padding: 12px 12px;
  outline: none;
  background: white;
  min-width: 60px;
  max-width: 200px;
`;

const NodeActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const AddButton = styled.button`
  padding: 6px 8px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #059669;
    transform: scale(1.05);
  }
`;

const ReadOnlyToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

const ReadOnlyLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`;

const ToggleCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const ToggleSlider = styled.span<{ $checked: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  background: ${(props) => (props.$checked ? "#646cff" : "#d1d5db")};
  border-radius: 12px;
  transition: all 0.3s;

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    top: 3px;
    left: ${(props) => (props.$checked ? "23px" : "3px")};
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const DeleteButton = styled.button`
  padding: 6px 8px;
  background: transparent;
  color: #ef4444;
  border: 1px solid #fecaca;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #fef2f2;
    border-color: #ef4444;
    transform: scale(1.05);
  }
`;

const NodeChildren = styled.div`
  margin-top: 4px;
`;

const PortTemplate: React.FC<PortTemplateProps> = ({ initialData }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(
    initialData || [
      {
        id: "a",
        label: "A",
        readOnly: false,
        children: [
          {
            id: "b",
            label: "B",
            readOnly: false,
            children: [
              {
                id: "d",
                label: "D",
                readOnly: false,
                children: [
                  {
                    id: "e",
                    label: "E",
                    readOnly: false,
                    children: [
                      {
                        id: "f",
                        label: "F",
                        readOnly: true,
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "g",
                label: "G",
                readOnly: false,
                children: [],
              },
            ],
          },
          {
            id: "c",
            label: "C",
            readOnly: false,
            children: [],
          },
        ],
      },
    ]
  );

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["a", "b", "d", "e", "f"])
  );

  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editLabelValue, setEditLabelValue] = useState<string>("");

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleReadOnly = (id: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, readOnly: !node.readOnly };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setTreeData(updateNode(treeData));
  };

  const updateLabel = (id: string, newLabel: string) => {
    const updateNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, label: newLabel };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setTreeData(updateNode(treeData));
  };

  const startEditing = (nodeId: string, currentLabel: string) => {
    setEditingNodeId(nodeId);
    setEditLabelValue(currentLabel);
  };

  const finishEditing = (nodeId: string) => {
    if (editLabelValue.trim()) {
      updateLabel(nodeId, editLabelValue.trim());
    }
    setEditingNodeId(null);
    setEditLabelValue("");
  };

  const handleLabelKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nodeId: string
  ) => {
    if (e.key === "Enter") {
      finishEditing(nodeId);
    } else if (e.key === "Escape") {
      setEditingNodeId(null);
      setEditLabelValue("");
    }
  };

  const deleteNode = (id: string) => {
    const removeNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.filter((node) => {
        if (node.id === id) return false;
        if (node.children) {
          node.children = removeNode(node.children);
        }
        return true;
      });
    };
    setTreeData(removeNode(treeData));
  };

  const addNode = (parentId: string | null) => {
    const newId = `node_${Date.now()}`;
    const newNode: TreeNode = {
      id: newId,
      label: `New ${newId.slice(-4)}`,
      readOnly: false,
      children: [],
    };

    if (parentId === null) {
      setTreeData([...treeData, newNode]);
    } else {
      const insertNode = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }
          if (node.children) {
            return { ...node, children: insertNode(node.children) };
          }
          return node;
        });
      };
      setTreeData(insertNode(treeData));
      setExpandedNodes((prev) => new Set([...prev, parentId]));
    }
  };

  const TreeNodeComponent: React.FC<{
    node: TreeNode;
    level: number;
  }> = ({ node, level }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <TreeNodeWrapper $level={level}>
        <NodeContent>
          <NodeLeft>
            {hasChildren ? (
              <ExpandButton onClick={() => toggleExpand(node.id)}>
                {isExpanded ? "−" : "+"}
              </ExpandButton>
            ) : (
              <ExpandSpacer />
            )}
            {editingNodeId === node.id ? (
              <NodeLabelInput
                value={editLabelValue}
                onChange={(e) => setEditLabelValue(e.target.value)}
                onBlur={() => finishEditing(node.id)}
                onKeyDown={(e) => handleLabelKeyDown(e, node.id)}
                autoFocus
                disabled={node.readOnly}
              />
            ) : (
              <NodeLabel
                onClick={() =>
                  !node.readOnly && startEditing(node.id, node.label)
                }
                title={node.readOnly ? "Read only" : "Click to edit"}
              >
                {node.label}
              </NodeLabel>
            )}
          </NodeLeft>

          <NodeActions>
            <AddButton onClick={() => addNode(node.id)} title="Add child node">
              <Plus size={14} />
            </AddButton>
            <ReadOnlyToggle>
              <ReadOnlyLabel>Read only</ReadOnlyLabel>
              <ToggleCheckbox
                checked={node.readOnly}
                onChange={() => toggleReadOnly(node.id)}
              />
              <ToggleSlider $checked={node.readOnly} />
            </ReadOnlyToggle>
            <DeleteButton
              onClick={() => deleteNode(node.id)}
              title="Delete node"
            >
              <Trash2 size={16} />
            </DeleteButton>
          </NodeActions>
        </NodeContent>

        {hasChildren && isExpanded && (
          <NodeChildren>
            {node.children!.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </NodeChildren>
        )}
      </TreeNodeWrapper>
    );
  };

  return (
    <PortTemplateContainer>
      <Header>
        <AddRootButton onClick={() => addNode(null)}>
          <Plus size={16} />
          Add Root Node
        </AddRootButton>
      </Header>

      <TreeContainer>
        {treeData.map((node) => (
          <TreeNodeComponent key={node.id} node={node} level={0} />
        ))}
      </TreeContainer>
    </PortTemplateContainer>
  );
};

export default PortTemplate;
