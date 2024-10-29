import Head from 'next/head';
import faviconUrl from '@/images/favicon.ico';

const Favicon: React.FC = () => (
  <Head>
    <link rel="icon" href={faviconUrl.src} sizes="any" />
  </Head>
);

export default Favicon;
