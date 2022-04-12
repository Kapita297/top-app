import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SizeTextProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 'big' | 'small';
  color?: 'goust' | 'red' | 'grey' | 'green-light' | 'primary';
  href?: string;
}
