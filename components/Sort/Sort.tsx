import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import SortIcon from '../../helpers/icons/Sort.svg';
import cn from 'classnames';
import { KeyboardEvent } from 'react';

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  const SortKeyDownRating = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      setSort(SortEnum.Rating);
    }
  };

  const SortKeyDownPrice = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      setSort(SortEnum.Price);
    }
  };
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortname} id="sort">
        Сортировка
      </div>
      <button
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        onKeyDown={SortKeyDownRating}
        tabIndex={0}
        className={cn({
          [styles.active]: sort == SortEnum.Rating,
        })}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby="sort rating">
        <SortIcon className={styles.sorticon} />
        По рейтингу
      </button>
      <button
        id="price"
        onClick={() => setSort(SortEnum.Price)}
        onKeyDown={SortKeyDownPrice}
        tabIndex={0}
        className={cn({
          [styles.active]: sort == SortEnum.Price,
        })}
        aria-selected={sort == SortEnum.Price}
        aria-labelledby="sort price">
        <SortIcon className={styles.sorticon} />
        По цене
      </button>
    </div>
  );
};
