import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { gql } from '@apollo/client';
import {
  Text,
  Modal,
  Button,
  ModalBody,
  Container,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Customer } from '@prisma/client';
import GoogleMapReact from 'google-map-react';

import client from '~/services/apollo';

export interface CustomerProps {
  customer: Customer & { lat: string; long: string };
}

const query = gql`
  query customer($id: Int!) {
    customer(id: $id) {
      id
      first_name
      last_name
      email
      gender
      company
      city
      title
      lat
      long
    }
  }
`;

const users = gql`
  query cityCustomers {
    cityCustomers {
      id
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { cityCustomers },
  } = await client.query<{ cityCustomers: Array<Customer> }>({ query: users });
  const paths = cityCustomers.map(({ id }) => ({ params: { id: String(id) } }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params: { id } }) {
  const {
    data: { customer },
  } = await client.query<CustomerProps>({ query, variables: { id: parseInt(id, 10) } });
  return {
    props: { customer },
  };
}

export default function CustomerDetails({
  customer,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleMap({ map, maps }: any) {
    const marker = new maps.Marker({
      position: {
        lat: parseInt(customer.lat, 10),
        lng: parseInt(customer.long, 10),
      },
      map,
    });
    maps.event.addListener(marker, 'click', () => {
      map.setZoom(15);
      onOpen();
    });
  }
  return (
    <Container maxW="100vw" h="100vh" px={0} centerContent>
      <Head>
        <title>Customer details</title>
      </Head>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAP }}
        defaultCenter={{
          lat: parseInt(customer.lat, 10),
          lng: parseInt(customer.long, 10),
        }}
        defaultZoom={11}
        onGoogleApiLoaded={handleMap}
        yesIWantToUseGoogleMapApiInternals
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${customer.last_name}, ${customer.first_name} - ${customer.title} at ${customer.company}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{`Lives at: ${customer.city}`}</Text>
            <Text>{`lat ${customer.lat} x lng ${customer.long}`}</Text>
            <Text>{`Sex: ${customer.gender}`}</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" colorScheme="red" onClick={onClose}>
              Close window
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
