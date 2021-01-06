import Document, {
  DocumentContext,
  DocumentProps,
  NextScript,
  Html,
  Head,
  Main,
} from 'next/document';

import { ColorModeScript } from '@chakra-ui/react';

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
