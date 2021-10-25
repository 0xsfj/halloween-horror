import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Halloween Horror</title>
        <meta name="description" content="Your trusty college student that is just trying to survive halloween night in the woods!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Halloween Horror</h1>
        <h2>Coming Soon</h2>
      </main>
    </div>
  );
}
