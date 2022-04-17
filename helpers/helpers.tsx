import CoursesIcon from './icons/Courses.svg';
import BooksIcon from './icons/Books.svg';
import ProductsIcon from './icons/Products.svg';
import ServisesIcon from './icons/Servises.svg';
import { TopLevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuIcon } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuIcon[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'servises',
    name: 'Сервисы',
    icon: <ServisesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const price = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .concat(' €');

export const declOfNum = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
