import Link from "next/link";
import styles from "../../Styles/modules/News/index.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "../PageTransition";

gsap.registerPlugin(ScrollTrigger);

const PostCard = ({ post }: any) => {
  const { title, slug, date, coverImage, excerpt } = post.fields;

  const { onLinkClick } = usePageTransition();

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

  const postClick = (e: any) => {
    e.preventDefault();
    onLinkClick(e, `/news/${slug}`);
  };

  return (
    <Link
      className={styles.news_row}
      key={date}
      href={`/news/${slug}`}
      onClick={postClick}
      prefetch={false}
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
