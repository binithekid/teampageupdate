"use client";

import { useEffect, useState } from "react";
import styles from "../../Styles/modules/News/post.module.scss";
import PostCard from "../../Components/News/PostCard";
import { client } from "../../utils/client";

export default function News() {
  async function getPosts() {
    const response = await client.getEntries({ content_type: "post" });
    const posts = await response.items;

    return posts;
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.news_page}>
      <section className={styles.news_section}>
        <h1>News</h1>

        <div className={styles.news_wrapper}>
          {posts?.map((post: any, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
