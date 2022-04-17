import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, price } from '../../helpers/helpers';
import { Diveder } from '../Diveder/Diveder';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: {
          opacity: 1,
          height: 'auto',
        },
        hidden: { opacity: 0, height: 0, overflow: 'hidden' },
      };

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        reviewRef.current?.focus();
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <img
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span className="display">цена</span>
              {price(Math.round(product.price / 95))}
              <span>
                {product.oldPrice && (
                  <Tag color="green-light" className={styles.oldprice}>
                    <span className="display">скидка</span>-
                    {price(Math.round((product.oldPrice - product.price) / 95))}
                  </Tag>
                )}
              </span>
            </div>
            <div className={styles.credit}>
              <span className="display">кредит</span>
              {price(Math.round(product.credit / 95))}/
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="display">
                {'рейтинг' + (product.reviewAvg ?? product.initialRating)}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag key={c} className={styles.category} color="goust">
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.pricetitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.credittitle} aria-hidden={true}>
              кредит
            </div>
            <div className={styles.ratetitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}
                {declOfNum(product.reviewCount, [
                  ' отзыв',
                  ' отзыва',
                  ' отзывов',
                ])}
              </a>
            </div>
            <Diveder className={styles.hr} />

            <div className={styles.description}>{product.description} </div>
            <div
              className={
                !product.advantages && !product.disadvantages
                  ? styles.feature2
                  : styles.feature
              }>
              {product.characteristics.map((c) => (
                <div className={styles.characteristic} key={c.name}>
                  <span className={styles.characteristicsname}>{c.name}</span>
                  <span className={styles.characteristicsdots}></span>
                  <span className={styles.characteristicsvalue}>{c.value}</span>
                </div>
              ))}
            </div>
            {(product.advantages || product.disadvantages) && (
              <div className={styles.advblock}>
                <div>
                  {product.advantages && (
                    <div className={styles.advantages}>
                      <div className={styles.advtitle}>Преимущества</div>
                      <div>{product.advantages}</div>
                    </div>
                  )}
                  {product.disadvantages && (
                    <div className={styles.disadvantages}>
                      <div className={styles.advtitle}>Недостатки</div>
                      <div>{product.disadvantages}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <Diveder className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearnce="primary">Узнать подробнее</Button>
              <Button
                appearnce="ghost"
                arrow={isReviewOpened ? 'down' : 'right'}
                className={styles.button}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}>
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isReviewOpened ? 'visible' : 'hidden'}>
            <Card
              color="blue"
              className={styles.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}>
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Diveder />
                </div>
              ))}

              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
