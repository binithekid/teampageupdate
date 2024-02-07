"use client";

import { useState } from "react";
import styles from "../../Styles/modules/News/post.module.scss";

import PostCard from "../../Components/News/PostCard";
import { client } from "../../utils/client";

const allCategories = ["All", "Firm", "Portfolio", "People"];

async function getPosts() {
  const response = await client.getEntries({ content_type: "post" });
  const posts = await response.items;

  return posts;
}

export default async function News() {
  const [activeCategory, setActiveCategory] = useState(allCategories[0]);

  const filterPosts = (category: any) => {
    console.log("category", category);
    setActiveCategory(category);
  };

  const posts = await getPosts();

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post: any) => post.category === activeCategory);

  return (
    <main className={styles.news_page}>
      <section className={styles.news_section}>
        <h1>News</h1>

        <div className={styles.news_wrapper}>
          <nav className={styles.news_categories}>
            {allCategories.map((category) => (
              <button
                className={category === activeCategory ? styles.active_cat : ""}
                onClick={() => filterPosts(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </nav>
          {filteredPosts.map((post: any, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
