import { Htag, Tag, HhData, Advantages, Sort, Product } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sortReducer';
import { useReducedMotion } from 'framer-motion';
import { declOfNum } from '../../helpers/helpers';

export const TopPageComponent = ({
  firstCategory,
  page,
  products,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );

  const shouldReduceMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  useEffect(() => {
    dispathSort({ type: 'reset', initialState: products });
  }, [products]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag
            color="grey"
            size="big"
            aria-label={
              products.length +
              declOfNum(products.length, ['элемент', 'элемента', 'элементов'])
            }>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              layout={shouldReduceMotion ? false : true}
              key={p._id}
              product={p}
            />
          ))}
      </div>
      <div className={styles.hhtitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>

        <Tag color="red" size="big">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      <div className={styles.tags}>
        {page.tags.map((t) => (
          <Tag key={t} color="primary" className={styles.tag}>
            {t}
          </Tag>
        ))}
      </div>
    </div>
  );
};
