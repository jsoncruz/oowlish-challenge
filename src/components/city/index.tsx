import { gql, useQuery } from '@apollo/client';
import { Text, BoxProps, Heading } from '@chakra-ui/react';

import Card from '@components/common/card';

interface CardProps extends BoxProps {
  city: string;
}

interface TotalCustomersProps {
  totalCustomers: {
    city: string;
    customers_total: number;
  };
}

const query = gql`
  query totalCustomers($city: String!) {
    totalCustomers(city: $city) {
      city
      customers_total
    }
  }
`;

const City: React.FC<CardProps> = ({ city, ...props }) => {
  const { data } = useQuery<TotalCustomersProps>(query, {
    variables: { city },
  });
  return (
    <Card href={`city/${city}`} {...props}>
      <Heading fontSize={16}>{data?.totalCustomers.city}</Heading>
      <Text fontSize={14}>Total: {data?.totalCustomers.customers_total ?? 0}</Text>
    </Card>
  );
};

export default City;
