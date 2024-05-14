import React, { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Number>();
  useEffect((): any => {
    function handleResize() {
      setWindowSize(typeof window !== "undefined" ? window.innerWidth : 0);
    }
    typeof window !== "undefined" &&
      window.addEventListener("resize", handleResize);
    handleResize();
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
