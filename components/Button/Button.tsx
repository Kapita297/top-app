import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from '../../helpers/icons/Arrow.svg';
import cn from 'classnames';

export const Button = ({
  appearnce,
  children,
  className,
  arrow = 'none',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearnce == 'primary',
        [styles.ghost]: appearnce == 'ghost',
      })}
      {...props}>
      {children}
      {arrow != 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == 'down',
          })}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
