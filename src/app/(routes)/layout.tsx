import "../Styles/globals.scss";
import localFont from "next/font/local";

// TYPES
import { ReactNode } from "react";
import { MainLayout } from "../Components/MainLayout";
import { AppProvider } from "../Context/AppProvider";
// import ErrorBoundary from '../Components/ErrorBoundry';

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Digital Gravity Partners | Digital Infra Investment",
  description:
    "Digital Gravity is a specialist digital infrastructure investment manager building platforms to deliver sustainable connectivity generations",
};

const myFont = localFont({
  src: [
    {
      path: "../fonts/AvenirLTProLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Avenir_Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AvenirLTProMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/AvenirLTProHeavy.woff",
      weight: "600",
      style: "normal",
    },
  ],
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>
      <body className={`no-scroll ${myFont.className}`}>
        {/* <div className="page_wrapper" > */}
        <div className="page_overlay_bg"></div>
        {/* <ErrorBoundary> */}
        <AppProvider>
          <MainLayout children={children} />
        </AppProvider>
        {/* </ErrorBoundary> */}
        <div className="cursor_container"></div>
        <div className="page_transition_wrapper">
          <div className="page_transition_logo">
            <svg
              width="94"
              viewBox="0 0 94 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0V87.6875H93.3639V0H0ZM86.7315 81.4583H6.63241V6.22917H86.7315V81.4583ZM39.8149 71.2042H50.7634V55.545H44.131V64.975H39.8149C34.5293 64.975 30.2234 60.9308 30.2234 55.9667C30.2234 54.2513 30.7336 52.5933 31.7029 51.1558C32.5294 49.9292 33.6722 48.8942 35.0089 48.1658C36.4578 47.38 38.121 46.9583 39.8046 46.9583H55.2735C58.0489 46.9583 60.7835 46.2875 63.2017 45.0225C65.5282 43.7958 67.5281 42.0229 68.9668 39.905C70.63 37.4612 71.4974 34.6342 71.4974 31.7208C71.4974 23.3162 64.2221 16.4833 55.2735 16.4833H44.3249V31.7208H50.9573V22.7125H55.2735C60.559 22.7125 64.8649 26.7567 64.8649 31.7208C64.8649 33.4458 64.3446 35.1133 63.365 36.5508C62.5079 37.8062 61.3345 38.8508 59.9468 39.5792C58.5284 40.3267 56.9061 40.7196 55.2633 40.7196H39.7944C36.9374 40.7196 34.1314 41.4287 31.6723 42.7608C29.4173 43.9875 27.4786 45.7317 26.0807 47.8017C24.4379 50.2358 23.5706 53.0533 23.5706 55.9475C23.5706 64.3521 30.8458 71.185 39.7944 71.185L39.8149 71.2042Z"
                fill="var(--bg-color)"
              />
            </svg>
          </div>
          <svg
            id="PageTransition"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              className="overlay__path"
              vectorEffect="non-scaling-stroke"
              d="M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z"
            />
          </svg>
        </div>
        {/* </div> */}
      </body>
    </html>
  );
}
