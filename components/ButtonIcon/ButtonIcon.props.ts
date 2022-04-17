import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from '../../helpers/icons/Up.svg';
import close from '../../helpers/icons/MobileClose.svg';
import menu from '../../helpers/icons/Menu.svg';

export const icons = {
  up,
  close,
  menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  appearnce: 'primary' | 'white';
}
