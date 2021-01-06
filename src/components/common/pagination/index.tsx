import { ReactNode, useCallback } from 'react';

import { Stack, Button } from '@chakra-ui/react';

interface PaginationProps {
  total: number;
  offset: number;
  onClick(offset: number): void;
}

const Pagination: React.FC<PaginationProps> = ({ total, offset, onClick }) => {
  const items: Array<ReactNode> = [];

  const handleClick = useCallback(
    (index: number) => {
      onClick(index);
    },
    [onClick],
  );

  for (let i = 1; i <= total; i += 1) {
    items.push(
      <Button
        key={i}
        size="sm"
        colorScheme="gray"
        onClick={() => handleClick(i)}
        variant={offset === i ? 'blue-shadow' : 'solid'}
      >
        {i}
      </Button>,
    );
  }
  return (
    <Stack my={10} isInline>
      {items}
    </Stack>
  );
};

export default Pagination;
