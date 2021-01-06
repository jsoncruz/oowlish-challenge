import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Customer } from '@prisma/client';

import Card from '@components/common/card';
import Pagination from '@components/common/pagination';
import client from '~/services/apollo';
import uniqueItems from '~/utils/uniqueItems';

export interface CitiesProps {
  cityCustomers: Array<Customer>;
}

const query = gql`
  query cityCustomers($city: String, $page: Int) {
    cityCustomers(city: $city, page: $page) {
      id
      first_name
      last_name
      email
      gender
      company
      city
      title
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { cityCustomers },
  } = await client.query<CitiesProps>({ query });
  const cities = uniqueItems(cityCustomers.map(({ city }) => city));
  const paths = cities.map((city) => ({ params: { name: encodeURI(city) } }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params: { name } }) {
  const {
    data: { cityCustomers },
  } = await client.query<CitiesProps>({ query, variables: { city: name, page: 1 } });
  return {
    props: { ssrData: cityCustomers },
  };
}

export default function City({ ssrData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [customers, setCustomers] = useState(ssrData);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    query: { name },
  } = useRouter();

  const [revalidate, { data }] = useLazyQuery<CitiesProps>(query);

  async function handlePage(index: number) {
    setCurrentPage(index);
  }

  useEffect(() => {
    revalidate({
      variables: { city: name, page: currentPage },
    });
  }, [currentPage, name, revalidate]);

  useEffect(() => {
    if (data?.cityCustomers) {
      setCustomers(data?.cityCustomers);
    }
  }, [data?.cityCustomers]);

  return (
    <Container maxW="90vw" centerContent>
      <Head>
        <title>{name}</title>
      </Head>
      <Heading fontSize={72} my={10} textAlign="center">
        {name}
      </Heading>
      <SimpleGrid columns={5} spacing={2}>
        {customers?.map((customer) => (
          <Card key={customer.id} href={`customer/${customer.id}`} w="100%">
            <Heading
              fontSize={17}
            >{`${customer.last_name}, ${customer.first_name} - ${customer.title} at ${customer.company}`}</Heading>
            <Text fontSize={14}>{customer.email}</Text>
            <Text fontSize={14}>{customer.city}</Text>
          </Card>
        ))}
      </SimpleGrid>
      <Pagination offset={currentPage} total={2} onClick={handlePage} />
    </Container>
  );
}
