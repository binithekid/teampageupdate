"use client";
import styles from "../../Styles/modules/News/index.module.scss";

import { useEffect } from "react";

const QRcode = () => {
  useEffect(() => {
    window.location.replace("https://vimeo.com/912330420?share=copy");
  }, []);

  return (
    <div className={styles.qrcode}>
      <p>Please wait while you are redirected..</p>
    </div>
  );
};

export default QRcode;
