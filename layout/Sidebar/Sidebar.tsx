import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Logo from '../../helpers/icons/Logo.svg';
import { Search } from '../../components';
import { useRouter } from 'next/router';
export const Sidebar = ({ className, ...props }: SidebarProps) => {
  const router = useRouter();

  const goToHome = () => {
    router.push({ pathname: '/' });
  };

  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo onClick={goToHome} className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};
