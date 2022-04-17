import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import CloseIcon from '../../helpers/icons/Close.svg';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form';
import {
  IReviewForm,
  IReviewSentResponse,
} from '../../interfaces/review.form.interface';
import axios from 'axios';
import { API } from '../../helpers/Api';
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setIsError] = useState<string>();
  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch (e) {
      if (e instanceof Error) setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewform, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните поле имя' },
          })}
          placeholder="Имя"
          className={styles.title2}
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните поле заголовок' },
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: 'Поставте рейтинг' },
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <TextArea
          {...register('description', {
            required: { value: true, message: 'Заполните поле описание ' },
          })}
          placeholder="Тект отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.sudmit}>
          <Button appearnce="primary" tabIndex={isOpened ? 0 : -1}>
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successtitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon
            className={styles.close}
            onClick={() => setIsSuccess(false)}
          />
        </div>
      )}

      {error && (
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, поробуйте обновить страницу
          <CloseIcon
            className={styles.close}
            onClick={() => setIsError(undefined)}
          />
        </div>
      )}
    </form>
  );
};
