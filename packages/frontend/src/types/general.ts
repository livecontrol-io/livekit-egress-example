import type { ReactNode } from 'react';

export type Maybe<T> = T | undefined;

export type PropsWithChildren<T = unknown> = T & {
  children?: Maybe<ReactNode>;
};
