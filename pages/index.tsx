import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, SizeText, Tag, Rating, Input } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps) {
  const [rating, setRating] = useState(5);
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearnce="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearnce="ghost" arrow="down">
        Кнопка
      </Button>
      <SizeText size="big">Большой</SizeText>
      <SizeText size="medium">Средний</SizeText>
      <SizeText size="small">Маленкий</SizeText>
      <Tag size="small" color="goust">
        Ghost
      </Tag>
      <Tag size="big" color="red">
        Red
      </Tag>
      <Tag size="small" color="green-light">
        Green
      </Tag>
      <Tag size="big" color="primary">
        Primary
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    }
  );
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
