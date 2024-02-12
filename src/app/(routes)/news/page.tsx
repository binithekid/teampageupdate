"use client";

import styles from "../../Styles/modules/News/index.module.scss";
import PostCard from "../../Components/News/PostCard";
import { client } from "../../utils/client";
import Pagination from "../../Components/News/Pagination";

async function getPosts(page: number) {
  const pageSize = 10;
  const pageNumber = page || 1;

  const response = await client.getEntries({
    content_type: "post",
    limit: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });

  const posts = response.items;
  const count = response.total;

  const totalPage = Math.ceil(count / pageSize);

  return { posts, totalPage };
}

export default async function News(context: any) {
  const data = await getPosts(parseInt(context.searchParams.page));

  const currentPage = parseInt(context.searchParams.page) || 1;

  return (
    <main className={styles.news_page}>
      <section className={styles.news_section}>
        <h1>News</h1>

        <div className={styles.news_wrapper}>
          {data.posts.map((post: any, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
        <Pagination totalPage={data.totalPage} currentPage={currentPage} />
      </section>
    </main>
  );
}
