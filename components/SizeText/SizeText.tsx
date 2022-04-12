import { SizeTextProps } from './SizeText.props';
import styles from './SizeText.module.css';
import cn from 'classnames';

export const SizeText = ({
  children,
  size = 'medium',
  className,
  ...props
}: SizeTextProps) => {
  return (
    <p
      className={cn(styles.default, className, {
        [styles.big]: size == 'big',
        [styles.medium]: size == 'medium',
        [styles.small]: size == 'small',
      })}
      {...props}>
      {children}
    </p>
  );
};
