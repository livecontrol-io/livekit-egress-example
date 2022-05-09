export interface Props {
  onDeviceIdSelect: (id: string) => void;
}

export interface InputInfo {
  label: string;
  id: string;
  stream: MediaStream;
}
