import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Main({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const homeClasses = "container-fluid d-flex flex-column flex-grow-1 p-0";
  const pageClasses = "container-fluid d-flex flex-column";

  // State to store header and footer padding values
  const [padding, setPadding] = useState({ paddingTop: 0, paddingBottom: 0 });

  useEffect(() => {
    // Function to get the full height including padding and margins
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

    // Select header and footer elements
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    // Get their heights including padding and margins
    const headerHeight = getElementHeight(header);
    const footerHeight = getElementHeight(footer);

    // Update the state with calculated padding values
    setPadding({
      paddingTop: headerHeight,
      paddingBottom: footerHeight,
    });
  }, []);

  return (
    <main
      className={`${isHomePage ? homeClasses : pageClasses} `}
      style={{
        height: "100dvh",
        paddingTop: `${padding.paddingTop}px`,
        paddingBottom: `${padding.paddingBottom}px`,
      }}
    >
      {children}
    </main>
  );
}
