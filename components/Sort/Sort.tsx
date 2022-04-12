import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import SortIcon from '../../helpers/icons/Sort.svg';
import cn from 'classnames';

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort == SortEnum.Rating,
        })}>
        <SortIcon className={styles.sorticon} />
        По рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort == SortEnum.Price,
        })}>
        <SortIcon className={styles.sorticon} />
        По цене
      </span>
    </div>
  );
};
