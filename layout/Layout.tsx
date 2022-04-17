import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';

const Layout = ({ children, ...props }: LayoutProps) => {
  const [isSkipLinkDispleyed, setIsSkipLinkDispleyed] =
    useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDispleyed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDispleyed(true)}
        tabIndex={1}
        onKeyDown={skipContentAction}
        className={cn(styles.skiplink, {
          [styles.displayed]: isSkipLinkDispleyed,
        })}>
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withlayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
