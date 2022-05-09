export interface IdentityState {
  name: string;
  room: string;
  identity: string;
}

export interface Props {
  onSubmit: (data: IdentityState) => void;
}
