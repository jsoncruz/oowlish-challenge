import Link from 'next/link';

import { Box, BoxProps } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  href: string;
}

const Card: React.FC<CardProps> = ({ href, ...props }) => (
  <Link href={href}>
    <Box
      m={3}
      p={3}
      bg="white"
      borderRadius={7}
      boxShadow="0 13px 27px -10px #58585f40, 0 8px 16px -16px #0000004d, 0 -6px 16px -12px #00000008"
      transition="all 0.2s linear"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-3px)',
      }}
      {...props}
    />
  </Link>
);

export default Card;
