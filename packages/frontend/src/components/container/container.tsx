import type { Props } from './types';
import cn from 'classnames';

export const Container = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn('p-5 bg-black rounded-lg opacity-30 bordered', className)}
      {...props}
    >
      {children}
    </div>
  );
};
