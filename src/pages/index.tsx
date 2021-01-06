import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { gql } from '@apollo/client';
import { Flex, Container, Stack, Heading } from '@chakra-ui/react';

import City from '@components/city';
import Card from '@components/common/card';
import client from '~/services/apollo';
import uniqueItems from '~/utils/uniqueItems';

import { CitiesProps } from './city/[name]';

const query = gql`
  query cityCustomers {
    cityCustomers {
      city
    }
  }
`;

export async function getStaticProps() {
  const {
    data: { cityCustomers },
  } = await client.query<CitiesProps>({ query });
  return {
    props: { cities: uniqueItems(cityCustomers.map(({ city }) => city)) },
  };
}

export default function Home({ cities }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container maxW="100vw" h="100vh" bg="gray.50">
      <Head>
        <title>Oowlish Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="100%" h="100%" align="center" flexDirection="column">
        <Heading fontSize={72} my={10}>
          CHALLENGE CITIES
        </Heading>
        <Stack flexWrap="wrap" justify="center" isInline>
          {cities.map((city) => (
            <City key={city} city={city} />
          ))}
        </Stack>
      </Flex>
    </Container>
  );
}
