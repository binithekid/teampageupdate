import Link from "next/link";
import styles from "../../Styles/modules/News/post.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const PostCard = ({ post }: any) => {
  const { title, slug, date, coverImage, excerpt } = post.fields;

  const postRef = useRef(null);

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

  useEffect(() => {
    const postElement = postRef.current;

    if (postElement) {
      const fadeInAnimation = gsap.fromTo(
        postElement,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );

      // Use ScrollTrigger to trigger animation when element comes into view
      ScrollTrigger.create({
        trigger: postElement,
        start: "top 80%", // Start animation when the top of the element is 80% into the viewport
        animation: fadeInAnimation,
        once: true, // Only trigger animation once
      });
    }
  }, [postRef]);

  return (
    <Link
      ref={postRef}
      className={styles.news_row}
      key={date}
      href={`/news/${slug}`}
    >
      <div className={styles.image_container}>
        <img
          src={`https:${coverImage.fields.file.url}`}
          alt={`Cover Image for ${title}`}
        />
      </div>
      <div className={styles.info_container}>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <span className={styles.date_cat}>{formatDate(date)}</span>
      </div>
    </Link>
  );
};

export default PostCard;
