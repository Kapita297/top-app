import { GetStaticProps } from 'next';
import { useState } from 'react';
import {
  Htag,
  Button,
  SizeText,
  Tag,
  Rating,
  Input,
  TextArea,
  Card,
} from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/Api';
import Logo from '../helpers/icons/Logo.svg';

function Home({ menu }: HomeProps) {
  const [rating, setRating] = useState(5);
  return (
    <div className="home">
      <div className="h1">
        <Logo />
        <Htag tag="h1">Самые лучшие курсы здесь</Htag>
      </div>
      <Card className="curses" color="blue">
        <Htag tag="h2">Курсы по</Htag>
        <Tag color="goust" size="big">
          Аналитике
        </Tag>
        <Tag color="goust" size="big">
          Бизнесу
        </Tag>
        <Tag color="goust" size="big">
          Дизайну
        </Tag>
        <Tag color="goust" size="big">
          Играм
        </Tag>
        <Tag color="goust" size="big">
          Маркетингу
        </Tag>
        <Tag color="goust" size="big">
          Програмированию
        </Tag>
        <Tag color="goust" size="big">
          И прочие
        </Tag>
        <Htag tag="h2">Можно посмотреть слева нажав на ссылку</Htag>
      </Card>
      <div className="h2">
        <Htag tag="h2">Преимущества</Htag>
        <Tag color="primary">Много курсов</Tag>
      </div>
    </div>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
