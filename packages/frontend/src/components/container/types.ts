import type { HTMLAttributes, ReactNode } from 'react';
import type { Maybe } from '~/types';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: Maybe<ReactNode>;
}
