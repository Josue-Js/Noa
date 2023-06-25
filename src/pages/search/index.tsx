import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Axios from "axios";

import { Navbar } from "@/components/Nabar"
import { ItemSearch } from "@/components/ItemSearch";

import { ITrendingList } from "@/@types";
import styles from '@/styles/pages/Search.module.scss';


type IResults = ITrendingList;


export default function Search() {

  const router = useRouter()
  const { query } = router.query;
  const [results, setResults] = useState<IResults>([]);

  useEffect(() => {
    
    (async () => {
      const { data } = await Axios.get<IResults>(`/api/search?query=${query}`);
      data.sort((a, b) => b.popularity - a.popularity)
      setResults(data)
    })()
  }, [router.query]);



  return (
    <div className={styles.container}>
      <Navbar />

      <Head>
        <title>{`${query} - Noa`}</title>
      </Head>

      <main className={styles.content}>
        <h2 className={styles.query}>Results: {query}</h2>

        <div className={styles.results}>
          {results.map(item => (
            <ItemSearch 
              key={item.id}
              media={item}
            />
          ))}
        </div>
      </main>
    </div>
  );
}