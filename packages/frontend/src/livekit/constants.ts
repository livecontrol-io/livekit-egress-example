import { Room } from "livekit-client";
import { createContext } from "react";
import { Settings } from "./types";

export const Context = createContext<{
  room: Room | undefined;
  connected: boolean;
  connect: (settings: Settings) => void;
}>({} as any);
