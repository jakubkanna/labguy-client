import { ReactNode, useEffect, useState } from "react";
import { Fade } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Main({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const homeClasses = "container-fluid d-flex flex-column flex-grow-1 p-0";
  const pageClasses = "container-fluid d-flex flex-column";

  // State to store header and footer padding values
  const [padding, setPadding] = useState({ paddingTop: 0, paddingBottom: 0 });

  // Fade-in control
  const [fadeIn, setFadeIn] = useState(true);

  // Trigger fade animation on location change using `location.key`
  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 500);
    return () => clearTimeout(timeout);
  }, [location]);

  // Calculate header and footer padding on component mount
  useEffect(() => {
    const getElementHeight = (element: HTMLElement | null): number => {
      if (!element) return 0;
      const style = window.getComputedStyle(element);
      return (
        element.clientHeight +
        parseFloat(style.marginTop) +
        parseFloat(style.marginBottom) +
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom)
      );
    };

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    const headerHeight = getElementHeight(header);
    const footerHeight = getElementHeight(footer);

    setPadding({
      paddingTop: headerHeight,
      paddingBottom: footerHeight,
    });
  }, []);

  return (
    <Fade in={fadeIn} timeout={500}>
      <main
        className={`${isHomePage ? homeClasses : pageClasses} `}
        style={{
          height: "100dvh",
          paddingTop: `${padding.paddingTop}px`,
          paddingBottom: `${padding.paddingBottom}px`,
        }}
      >
        {fadeIn && children}
      </main>
    </Fade>
  );
}
