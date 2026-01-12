export interface PortNode {
  id: string;
  label: string;
  isReadOnly: boolean;
  children: PortNode[];
}
