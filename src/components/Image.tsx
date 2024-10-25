import { useEffect, useState } from "react";
import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { getImageAttributes } from "../utils/utils";

interface ImageProps {
  imageref?: ImageRefSchema;
  className?: string;
  fallbackUrl?: string; // Optional custom fallback image URL
}

export default function Image({ imageref, className }: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(""); // State to handle image source
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [isImageValid, setIsImageValid] = useState<boolean>(true); // State to check image validity

  const { src, srcSet, sizes, alt } = imageref
    ? getImageAttributes(imageref)
    : { src: "", srcSet: "", sizes: "", alt: "" };

  useEffect(() => {
    if (src) {
      // Validate the image URL
      fetch(src)
        .then((response) => {
          if (response.ok) {
            // If the response is OK, set the image source
            setImgSrc(src);
            setIsImageValid(true);
          } else {
            // If not OK, set the fallback URL
            setIsImageValid(false);
          }
        })
        .catch(() => {
          // If there's an error in the fetch, also set the fallback URL
          setIsImageValid(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [src]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isImageValid) {
    return;
  }

  return (
    <img
      src={imgSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      className={className || "img-fluid"}
    />
  );
}
