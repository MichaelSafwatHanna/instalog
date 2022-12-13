import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Table } from "./Home/Table";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>InstaLog</title>
        <meta name="description" content="Event logging as a service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center pt-8">
        <Table />
      </main>
    </div>
  );
}
