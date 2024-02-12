import styles from "../../Styles/modules/News/index.module.scss";
import Link from "next/link";

const Pagination = ({ currentPage, totalPage }: any) => {
  return (
    <main className={styles.pagination_container}>
      <div className={styles.pagination_wrapper}>
        {currentPage > 1 && (
          <Link href={`news/?page=${currentPage - 1}`}>
            <p className={styles.next_button}>Back</p>
          </Link>
        )}
      </div>
      <div className={styles.pagination_wrapper}>
        <p>Page</p>
        <p>{currentPage}</p>
        <p>of</p>
        <p>{totalPage}</p>

        {totalPage > 1 && (
          <Link href={`news/?page=${currentPage + 1}`}>
            <p className={styles.next_button}>Next</p>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Pagination;
