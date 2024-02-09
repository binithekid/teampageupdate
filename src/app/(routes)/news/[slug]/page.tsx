"use client";

import React from "react";
import styles from "../../../Styles/modules/News/post.module.scss";
import { client } from "../../../utils/client";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Link from "next/link";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function generateStaticParams() {
  const response = await client.getEntries({ content_type: "post" });
  const paths = response.items.map((item: any) => ({
    params: {
      slug: item.fields.slug,
    },
  }));

  return paths;
}

export default async function Post({ params }: any) {
  const getContent = async (params: { slug: any }) => {
    const response = await client.getEntries({
      content_type: "post",
      "fields.slug": params?.slug,
    });

    const content = await response?.items?.[0];

    return content;
  };

  const content = await getContent(params);

  const options: any = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <p className={styles.postText}>{children}</p>;
      },

      [INLINES.ENTRY_HYPERLINK]: (node: any) => {
        if (node.data.target.sys.contentType.sys.id === "post") {
          return (
            <Link href={`/blog/${node.data.target.fields.slug}`}>
              {node.data.targets.field.title}
            </Link>
          );
        }
      },

      [INLINES.HYPERLINK]: (node: any) => {
        const text = node.content.find(
          (item: any) => item.nodeType === "text"
        )?.value;

        return (
          <a
            className={styles.emailLink}
            href={node.data.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <iframe
              height="400"
              width="100%"
              src={node.data.target.fields.embedUrl}
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return (
          <img
            src={node.data.target.fields.file.url}
            alt={node.data.target.fields.title}
          />
        );
      },
    },
  };

  function formatDate(inputDate: any) {
    const date = new Date(inputDate);

    // Define custom month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, and year separately
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Add 'th' to day
    const formattedDay = `${day}${getDaySuffix(day)}`;

    // Get the month name from the custom list
    const monthName = monthNames[monthIndex];

    return `${formattedDay} ${monthName} ${year}`;
  }

  // Helper function to get day suffix (e.g., "th", "st", "nd", "rd")
  function getDaySuffix(day: any) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <>
      <Head>
        <title>{`${content?.fields.title} | Aim Hire`}</title>
        <meta name="description" content={content?.fields.excerpt} />
      </Head>

      <main className={styles.post}>
        <div className={styles.topSection}>
          <div>
            <p className={styles.smallTitle}>Digital Gravity Press Release</p>
            <p className={styles.smallTitle}>
              London, United Kingdom, {formatDate(content?.fields?.date)}
            </p>
            <p className={styles.smallTitle}>
              {content?.fields.author.fields.name},{" "}
              {content?.fields.author.fields.position}:{" "}
              <a className={styles.emailLink}>
                {" "}
                {content?.fields.author.fields.email}:{" "}
              </a>
            </p>
          </div>

          <div className={styles.logo_wrapper}>
            <svg
              width="55"
              viewBox="0 0 94 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0V87.6875H93.3639V0H0ZM86.7315 81.4583H6.63241V6.22917H86.7315V81.4583ZM39.8149 71.2042H50.7634V55.545H44.131V64.975H39.8149C34.5293 64.975 30.2234 60.9308 30.2234 55.9667C30.2234 54.2513 30.7336 52.5933 31.7029 51.1558C32.5294 49.9292 33.6722 48.8942 35.0089 48.1658C36.4578 47.38 38.121 46.9583 39.8046 46.9583H55.2735C58.0489 46.9583 60.7835 46.2875 63.2017 45.0225C65.5282 43.7958 67.5281 42.0229 68.9668 39.905C70.63 37.4612 71.4974 34.6342 71.4974 31.7208C71.4974 23.3162 64.2221 16.4833 55.2735 16.4833H44.3249V31.7208H50.9573V22.7125H55.2735C60.559 22.7125 64.8649 26.7567 64.8649 31.7208C64.8649 33.4458 64.3446 35.1133 63.365 36.5508C62.5079 37.8062 61.3345 38.8508 59.9468 39.5792C58.5284 40.3267 56.9061 40.7196 55.2633 40.7196H39.7944C36.9374 40.7196 34.1314 41.4287 31.6723 42.7608C29.4173 43.9875 27.4786 45.7317 26.0807 47.8017C24.4379 50.2358 23.5706 53.0533 23.5706 55.9475C23.5706 64.3521 30.8458 71.185 39.7944 71.185L39.8149 71.2042Z"
                fill="currentcolor"
              />
            </svg>
          </div>
        </div>
        <div className={styles.postContent}>
          <h1 className={styles.postTitle}>{content?.fields.title} </h1>
          <p className={styles.subTitle}>{content?.fields.excerpt}</p>

          <hr />

          {documentToReactComponents(content?.fields.content, options)}
        </div>
      </main>
    </>
  );
}
