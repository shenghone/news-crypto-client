import React, { useCallback, useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { NEWS } from "../../redux/constants";
import { useLocation } from "react-router-dom";
import { TimelineMax, gsap } from "gsap";

import { getTitle } from "../../util";

const NewsCardWrapper = styled.div`
  font-family: "Crimson Text";
  position: relative;

  h5 {
    position: relative;
    text-transform: uppercase;
    padding: 8px 0px;
    cursor: pointer;

    &:hover {
      color: #0779e4;
      text-decoration: underline;
    }
  }

  img {
    opacity: 0;
  }

  p:nth-of-type(2) {
    font-size: ${(props) => (props.direction === "grid" ? "15px" : "14px")};
    color: ${(props) => (props.direction === "grid" ? "#464159" : "#6c7b95;")};
  }

  h2 {
    font-weight: ${(props) => (props.direction === "grid" ? "bold" : "")};
    font-size: ${(props) => (props.direction === "grid" ? "2rem" : "15px")};
    line-height: ${(props) => (props.direction === "grid" ? "2.5rem" : "")};
    padding: ${(props) => (props.direction === "grid" ? "4px 3px" : "2px")};
  }
  p:nth-of-type(1) {
    display: ${(props) => (props.direction === "grid" ? "block" : "none")};
    position: relative;
    margin: 0px 5px 15px 5px;
    font-size: 12px;
    color: rgba(57, 62, 70, 0.6);
    text-transform: uppercase;
    font-weight: 1000;
    letter-spacing: 0.08rem;
  }
  > div:nth-of-type(1) {
    position: relative;
    overflow: hidden;

    > div:nth-of-type(1) {
      display: ${(props) => (props.idx === 0 ? "block" : "none")};
      position: absolute;
      width: 140%;
      height: 140%;
      background: #f9f6f7;
      overflow: hidden;

      z-index: 2;
    }
  }
  > div:nth-of-type(2) {
    > * {
      opacity: ${(props) => (props.direction === "grid" ? 0 : "")};
    }
    > a {
      text-decoration: none;
      font-size: 0.8rem;
      color: #30475e;
      font-weight: 100;
      display: grid;
      justify-self: end;
      text-align: right;
    }
  }
  h4 {
    width: auto;
    letter-spacing: 0.03rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 960px) {
    margin: 0.7rem 0;
    width: ${(props) => (props.direction === "grid" ? "100%" : "50%")};
    box-sizing: border-box;
    height: ${(props) => (props.direction === "grid" ? "100%" : "auto")};
    padding-right: ${(props) =>
      props.direction === "flex" && props.idx % 2 === 1 ? "10px" : "auto"};
    padding-left: ${(props) =>
      props.direction === "flex" && props.idx % 2 === 0 ? "10px" : "auto"};

    p:nth-of-type(1) {
      margin: 0px 5px 5px 5px;
    }
    h4 {
      width: 100%;
      text-justify: center;
    }

    img {
      position: ${(props) =>
        props.direction === "grid" ? "absolute" : "relative"};
      width: ${(props) => (props.direction === "grid" ? "100%" : "100%")};
      height: ${(props) => (props.direction === "grid" ? "100%" : "200px")};
      object-fit: ${(props) =>
        props.direction === "grid" ? "cover" : "cover"};
    }

    > div:nth-of-type(1) {
      width: ${(props) => (props.direction === "grid" ? "100%" : "100%")};
      height: ${(props) => (props.direction === "grid" ? "100%" : "200px")};
    }
    div:nth-of-type(2) {
      box-sizing: border-box;

      bottom: ${(props) => (props.direction === "grid" ? "5%" : "")};
      right: ${(props) => (props.direction === "grid" ? "0px" : "")};
      position: ${(props) => (props.direction === "grid" ? "absolute" : "")};
      width: ${(props) => (props.direction === "grid" ? "60%" : "")};
      height: ${(props) => (props.direction === "grid" ? "auto" : "")};
      padding: ${(props) => (props.direction === "grid" ? "1rem" : "")};
      margin-top: ${(props) => (props.direction !== "grid" ? "1.2rem" : "")};
      background: ${(props) =>
        props.direction === "grid" ? "rgba(252,248,243,0.75)" : ""};
    }
    h2 {
      font-size: 1.1rem;
      line-height: 1.4rem;
    }
  }

  @media (min-width: 960px) {
    overflow-y: ${(props) => (props.direction === "grid" ? "hidden" : "")};
    flex-direction: ${(props) => (props.direction === "flex" ? "column" : "")};
    display: ${(props) => (props.direction === "grid" ? "grid" : "flex")};
    grid-template-columns: ${(props) =>
      props.direction === "grid" ? "1fr 1fr" : "none"};
    width: ${(props) => (props.direction !== "grid" ? "250px" : "100%")};
    justify-content: ${(props) => (!props.data ? "center" : "none")};
    text-align: ${(props) => (!props.data ? "center" : "none")};
    grid-template-rows: ${(props) =>
      props.direction === "grid" ? "1fr" : "none"};
    margin: ${(props) => (props.direction !== "grid" ? "0 15px" : "0px")};
    > div:nth-of-type(1) {
      width: ${(props) => (props.direction !== "grid" ? "250px" : "100%")};
      height: ${(props) => (props.direction !== "grid" ? "200px" : "100%")};
    }
    img {
      display: ${(props) => (props.direction === "grid" ? "grid" : "")};
      justify-self: ${(props) => (props.direction === "grid" ? "start" : "")};
      left: 0px;
      height: ${(props) => (props.direction !== "grid" ? "200px" : "100%")};
      width: ${(props) => (props.direction === "grid" ? "100%" : "250px")};
      display: ${(props) => (props.direction === "grid" ? "grid" : "")};
      grid-column: ${(props) =>
        props.direction === "grid" ? "1 / span 1" : "none"};

      max-width: ${(props) => (props.direction === "grid" ? "100%" : "none")};
      max-height: ${(props) => (props.direction === "grid" ? "100%" : "none")};
      object-fit: ${(props) =>
        props.direction === "grid" ? "cover" : "cover"};
    }
    h4 {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      width: 250px;
    }

    > div:nth-of-type(2) {
      padding: ${(props) => (props.direction === "grid" ? "25px" : "0px")};
      display: ${(props) => (props.direction === "grid" ? "grid" : "auto")};
      align-content: center;
    }
  }
  @media (max-width: 620px) {
    width: 100%;
    margin: 1rem 0;
    > div:nth-of-type(1) {
      width: ${(props) => (props.direction === "grid" ? "100%" : "100%")};
      height: ${(props) => (props.direction === "grid" ? "300px" : "200px")};
      position: relative;
    }
    div:nth-of-type(2) {
      padding: 0 1.5rem;
      margin-top: 1.5rem;
      bottom: ${(props) => (props.direction === "grid" ? "0px" : "")};
      width: ${(props) => (props.direction === "grid" ? "100%" : "")};
      position: ${(props) =>
        props.direction === "grid" ? "relative" : "relative"};
    }
  }
`;

const NewsCard = ({ data, direction, idx }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const linkRef = useRef();
  const blockerRef = useRef();
  const textAreaRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();
  const INCREMENT_PAGE = useCallback(() => dispatch({ type: NEWS.LOAD }), [
    dispatch,
  ]);
  const getPath = (fullPath) => {
    if (fullPath === "/") {
      return "world";
    }
    return fullPath.split("/")[1];
  };
  const handleClick = (data) => {
    window.open(data.url, "_blank");
  };
  const newsState = useSelector((state) => state.NEWS);

  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0.95,
  });
  React.useEffect(() => {
    if (inView) {
      INCREMENT_PAGE();
    }
  }, [inView, INCREMENT_PAGE]);

  const getDescription = (desc) => {
    const d = desc.split(" ");

    return d.reduce((result, word, index) => {
      if (index < (idx !== 0 ? 20 : 30)) {
        return result.concat(`${word} `);
      } else if (index === 20) {
        if (
          result[result.length - 2] === "." ||
          result[result.length - 2] === ","
        ) {
          return result;
        }
        return result.concat(" ...");
      }
      return result;
    }, "");
  };
  const getText = () => {
    if (
      newsState.total <= newsState.news.length + newsState.filtered ||
      newsState.news.length + 20 > 100
    ) {
      return "end";
    } else {
      return "load more";
    }
  };
  useLayoutEffect(() => {
    if (idx === 0 && loaded) {
      const et = new TimelineMax();
      gsap.set(blockerRef.current, {
        skewX: -30,
        blur: "20px",
      });
      gsap.to(blockerRef.current, 1.8, {
        x: "-150%",
        opacity: -10,
      });
      et.set(imgRef.current, {
        opacity: 0,
        y: -20,
      }).to(imgRef.current, 1.2, {
        opacity: 1,
        delay: 0.7,
        y: 0,
      });
      gsap.set(textAreaRef.current.children[0], {
        y: 10,
        opacity: 0,
      });
      gsap.to(textAreaRef.current.children[0], 1.2, {
        y: 0,
        delay: 1.2,
        opacity: 1,
      });
      gsap.set(textAreaRef.current.children[1], {
        x: 20,
        opacity: 0,
      });
      gsap.to(textAreaRef.current.children[1], 1.2, {
        x: 0,
        delay: 1.6,
        opacity: 1,
      });
      gsap.set(textAreaRef.current.children[2], {
        x: 26,
        opacity: 0,
      });
      gsap.to(textAreaRef.current.children[2], 1.4, {
        x: 0,
        delay: 2,
        opacity: 1,
      });
      gsap.set(textAreaRef.current.children[3], {
        y: 20,
        opacity: 0,
      });
      gsap.to(textAreaRef.current.children[3], 1, {
        y: 0,
        delay: 2.3,
        opacity: 1,
      });
      gsap.set(linkRef.current, {
        blur: "5px",
        opacity: 0,
      });
      gsap.to(linkRef.current, 1.5, {
        delay: 2.5,
        blur: "0px",
        opacity: 0.7,
      });
    } else {
      if (idx !== 0 && loaded) {
        const et = new TimelineMax();
        et.set(imgRef.current, {
          opacity: 0,
        }).to(imgRef.current, 1.2, {
          delay: 1.8,
          opacity: 1,
        });
      }
    }
  }, [loaded, idx]);
  return (
    <NewsCardWrapper direction={direction} data={data} idx={idx}>
      {data && (
        <>
          <div>
            <div ref={blockerRef}></div>
            <img
              ref={imgRef}
              onLoad={() => setLoaded(true)}
              src={data.urlToImage}
              alt="news cover"
            />
          </div>

          <div ref={textAreaRef}>
            <p>{getPath(pathname)}</p>
            <h2>{getTitle(data.title)}</h2>
            <p>
              {data.description
                ? getDescription(data.description)
                : "(no description)"}
            </p>
            <h5 onClick={() => handleClick(data)}>
              read article
              <i
                style={{
                  position: "relative",
                  display: "inline-block",
                  transform: "translate(2px,1px)",
                }}
                className="fas fa-angle-right"
              ></i>
            </h5>

            {idx === 0 && (
              <a
                ref={linkRef}
                href="https://newsapi.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                source: newsapi.org
              </a>
            )}
          </div>
        </>
      )}
      {!data && <h4 ref={ref}>{getText()}</h4>}
    </NewsCardWrapper>
  );
};

export default NewsCard;
