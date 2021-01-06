import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  ...chakraTheme,
  components: {
    ...chakraTheme.components,
    Button: {
      ...chakraTheme.components.Button,
      variants: {
        ...chakraTheme.components.Button.variants,
        'blue-shadow': {
          boxShadow: `0 4px 14px 0 #006ae650`,
          bg: '#1a83ff',
          color: '#fff',
          fontWeight: 500,
          _hover: {
            bg: '#4a9fff',
          },
        },
      },
    },
  },
});

export default theme;
