import type { Props } from './types';
import cn from 'classnames';

export const Container = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn('p-5 bg-base-300 rounded-lg bordered', className)}
      {...props}
    >
      {children}
    </div>
  );
};
