import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { extractCritical } from '@emotion/server';

const APP_NAME = 'Phone Book';
const APP_DESCRIPTION = 'Phone Book SPA';

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const critical = extractCritical(initialProps.html);
    initialProps.html = critical.html;
    initialProps.styles = (
      <>
        {initialProps.styles}
        <style
          data-emotion-css={critical.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </>
    );

    return initialProps;
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <link rel="mask-icon" href="/icon-192x192.png" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />

          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />

          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icon-192x192.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" type="image/png" href="/icon-192x192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
