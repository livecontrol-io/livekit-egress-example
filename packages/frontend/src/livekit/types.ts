export interface Settings {
  url: string;
  token: () => Promise<string>;
}

export interface UserSettings {
  identity: string;
  name: string;
}
