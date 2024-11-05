import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Helper function to calculate the main height including padding and margins
function calculateMainHeight(
  headerHeight: number,
  footerHeight: number
): string {
  const totalHeight = window.innerHeight; // Get the total height of the viewport
  const mainHeight = totalHeight - headerHeight - footerHeight; // Calculate main height
  return `${mainHeight}px`; // Return height as a string with 'px'
}

export default function Main({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const homeClasses = "container-fluid d-flex flex-column flex-grow-1 p-0";
  const pageClasses = "container-fluid d-flex flex-column";

  const [mainStyle, setMainStyle] = useState<React.CSSProperties>({
    height: "auto",
  });

  useEffect(() => {
    // Function to get the total height including margins and paddings
    const getElementHeight = (element: HTMLElement | null): number => {
      if (!element) return 0;
      const style = window.getComputedStyle(element);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);
      return (
        element.clientHeight +
        marginTop +
        marginBottom +
        paddingTop +
        paddingBottom
      );
    };

    // Reference the header and footer elements
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    // Get the heights of header and footer including padding and margins
    const headerHeight = getElementHeight(header);
    const footerHeight = getElementHeight(footer);

    // Calculate and set the main height
    const calculatedHeight = calculateMainHeight(headerHeight, footerHeight);
    setMainStyle({ height: calculatedHeight });

    // Add a resize listener to recalculate on window resize
    const handleResize = () => {
      const newCalculatedHeight = calculateMainHeight(
        headerHeight,
        footerHeight
      );
      setMainStyle({ height: newCalculatedHeight });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the resize listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className={isHomePage ? homeClasses : pageClasses} style={mainStyle}>
      {children}
    </main>
  );
}
