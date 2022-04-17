import { DivederProps } from './Diveder.props';
import styles from './Diveder.module.css';
import cn from 'classnames';

export const Diveder = ({ className, ...props }: DivederProps) => {
  return <hr className={cn(styles.hr, className)} {...props} />;
};
