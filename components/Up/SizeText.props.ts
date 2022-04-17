import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SizeTextProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
  size?: 'big' | 'medium' | 'small';
}
