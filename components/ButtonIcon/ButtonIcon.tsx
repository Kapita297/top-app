import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';

import cn from 'classnames';

export const ButtonIcon = ({
  appearnce,
  className,
  icon,
  ...props
}: ButtonIconProps) => {
  const IconComp = icons[icon];
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearnce == 'primary',
        [styles.white]: appearnce == 'white',
      })}
      {...props}>
      <IconComp />
    </button>
  );
};
