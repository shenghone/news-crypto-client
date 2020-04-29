import { useEffect, useState } from "react";

const useWidth = () => {
  const [width, setWidth] = useState();
  const resize = () => {
    const w = window.innerWidth;
    setWidth(w);
  };
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return width;
};

export default useWidth;
