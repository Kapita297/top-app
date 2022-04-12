import { SizeTextProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({
  children,
  size = 'small',
  className,
  color = 'goust',
  href,
  ...props
}: SizeTextProps) => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.big]: size == 'big',
        [styles.small]: size == 'small',
        [styles.goust]: color == 'goust',
        [styles.green]: color == 'green-light',
        [styles.grey]: color == 'grey',
        [styles.primary]: color == 'primary',
        [styles.red]: color == 'red',
      })}
      {...props}>
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
