import Link from "next/link";
import styles from "../../Styles/modules/News/post.module.scss";

const PostCard = ({ post }: any) => {
  const { title, slug, date, type } = post.fields;

  return (
    <Link
      className={styles.news_row}
      key={date}
      href={`/news/${slug}`}
      target="_blank"
    >
      <span className={styles.date_cat}>
        {date} &nbsp;-&nbsp; {type}
      </span>
      <h2>{title}</h2>
    </Link>
  );
};

export default PostCard;
