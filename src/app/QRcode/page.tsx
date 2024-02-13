"use client";

import { useEffect } from "react";

const QRcode = () => {
  useEffect(() => {
    window.location.replace("https://vimeo.com/912330420?share=copy");
  }, []);

  return null; // No need to render anything since we're redirecting
};

export default QRcode;
