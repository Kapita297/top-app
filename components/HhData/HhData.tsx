import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css';
import { Card } from '../Card/Card';
import RateIcon from '../../helpers/icons/Rate.svg';
import { price } from '../../helpers/helpers';

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps) => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countvalue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryvalue}>
            {price(Math.round(juniorSalary / 95))}
          </div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryvalue}>
            {' '}
            {price(Math.round(middleSalary / 95))}
          </div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryvalue}>
            {price(Math.round(seniorSalary / 95))}
          </div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
