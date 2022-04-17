import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuIcon, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  const openSecondlevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondlevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      openSecondlevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstlevel, {
                    [styles.firstlevelActive]: m.id == firstCategory,
                  })}>
                  {m.icon}
                  {m.name}
                </div>
              </a>
            </Link>
            {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuIcon) => {
    return (
      <div className={styles.secondblock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondlevelKey(key, m._id.secondCategory)
                }
                className={styles.secondlevel}
                onClick={() => openSecondlevel(m._id.secondCategory)}>
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondlevelblock)}>
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };
  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdlevel, {
              [styles.thirdlevelactive]:
                `/${route}/${p.alias}` == router.asPath,
            })}>
            {p.category.length > 20
              ? p.category.slice(0, 20) + '...'
              : p.category}
          </a>
        </Link>
      </motion.div>
    ));
  };

  return (
    <nav className={styles.menu} role="navigation">
      {buildFirstLevel()}
    </nav>
  );
};
