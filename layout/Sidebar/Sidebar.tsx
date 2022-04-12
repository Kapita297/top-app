import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import Logo from '../../helpers/icons/Logo.svg';
export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo />
      <div>поиск</div>
      <Menu />
    </div>
  );
};
