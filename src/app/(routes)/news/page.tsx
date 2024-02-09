"use client";

import styles from "../../Styles/modules/News/post.module.scss";
import PostCard from "../../Components/News/PostCard";
import { client } from "../../utils/client";

async function getPosts() {
  const response = await client.getEntries({ content_type: "post" });
  const posts = await response.items;

  return posts;
}

export default async function News() {
  const posts = await getPosts();

  return (
    <main className={styles.news_page}>
      <section className={styles.news_section}>
        <h1>News</h1>

        <div className={styles.news_wrapper}>
          {posts.map((post: any, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
