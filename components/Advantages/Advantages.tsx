import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import cn from 'classnames';
import CheckIcon from '../../helpers/icons/Сheck.svg';
import { Htag } from '../Htag/Htag';
import { SizeText } from '../SizeText/SizeText';

export const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantages}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <SizeText size="big">{a.description}</SizeText>
        </div>
      ))}
    </>
  );
};
