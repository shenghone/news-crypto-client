import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function getTitle(str) {
  let newStr = str.split(" - ");
  return newStr[0];
}

export function getTimeDifferences(current, target) {
  const cur = dayjs(current);
  const tar = dayjs(target);
  let dif = cur.diff(tar, "hour");

  //if the target time is less than one hour apart from now
  if (!dif) {
    let min = cur.diff(tar, "minute");
    if (min === 1) {
      return min + " minute ago";
    }
    return min + " minutes ago";
    //if the target time is equal or more than one hour apart from now
  } else {
    if (dif === 1) {
      return dif + " hour ago";
    } else if (dif > 23) {
      dif = cur.diff(tar, "day");
      if (dif === 1) {
        return dif + " day ago";
      } else {
        return dif + " days ago";
      }
    }
    return dif + " hours ago";
  }
}

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const resize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [width]);
  return width;
};
