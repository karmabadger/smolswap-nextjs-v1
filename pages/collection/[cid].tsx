import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { useRouter } from "next/router";
import { parseSearchQuery, SearchQueryDict } from "@utils/parse/searchQuery";

import { useAtom } from "jotai";
import sortByAtom from "@atoms/sortByAtom";
import collectionsAtom from "@atoms/CollectionsAtom";

const CollectionPage: NextPage = () => {
  const router = useRouter();
  console.log("CollectionPage", router.query);

  // not null
  const cid = router.query.cid as string;

  const searchQueryDict: SearchQueryDict = parseSearchQuery(
    router.query.search as string
  );

  const sortByQuery = router.query.sort as string;
  const [sortBy, setSortBy] = useAtom(sortByAtom);

  useEffect(() => {
    if (sortByQuery !== undefined && sortByQuery !== null) {
      setSortBy(sortByQuery);
    }
  }, [sortByQuery, setSortBy]);

  // can be null
  const contains = router.query.contains as string;

  const [collections, setCollections] = useAtom(collectionsAtom);

  console.log("CollectionPage", collections);

  return (
    <div className={styles.container}>
      <Head>
        <title>Smolswap</title>
        <meta
          name="description"
          content="Smolswap: a decentralized aggregator for smol swaps"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default CollectionPage;
