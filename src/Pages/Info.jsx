import React, { useState, useLayoutEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useWidth } from "../util";
import { TimelineMax } from "gsap";

const InfoWrapper = styled.div`
  font-family: "Caladea", serif;
  position: relative;
  display: grid;
  background: rgba(174, 172, 172, 0.4);
  grid-area: rest;
  height: 100%;
  overflow-y: scroll;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 1fr;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  > div:nth-of-type(1) {
    position: relative;

    grid-column: 6 / span 5;
    grid-row: 1 / span 1;

    > h5 {
      position: absolute;
      font-weight: 600;
      font-size: 2rem;
      top: 70%;
      left: 50%;

      transform: translate(70px, -100px);
      z-index: 2;
      color: rgba(49, 65, 85);
      text-transform: uppercase;
    }
    > h4 {
      position: absolute;
      font-size: 4rem;
      display: grid;
      justify-self: center;
      z-index: 2;
      top: 70%;
      left: 50%;
      transform: translateX(-196px);
      @media (max-width: 480px) {
        font-size: 3rem;
        transform: translateX(-156px);
      }

      user-select: none;
      cursor: pointer;
      color: #d7385e;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
      :hover {
        opacity: 0.6;
      }
    }
    > h4:nth-of-type(2) {
      margin-top: 4rem;
      z-index: 1;
      color: #f3c623;
    }
    > span {
      position: absolute;
      user-select: none;
      top: 70%;
      left: 50%;

      transform: translate(160px, -30px) scale(2);
    }
    /*shade*/
    > div:nth-of-type(1) {
      position: absolute;
      width: 300px;
      height: 300px;
      left: 50%;
      top: 70%;
      transform: translate(-50%, -50%);
      background: rgba(51, 66, 85, 0.4);
      filter: blur(90px);
      border-radius: 50%;
      z-index: 0;
    }
    /*moon*/
    > section:nth-of-type(1) {
      position: absolute;
      width: 200px;
      height: 200px;
      z-index: 2;

      top: 70%;
      left: 50%;

      transform: translate(-50%, -50%);
      background: rgba(237, 240, 243, 1);
      box-shadow: -25px -25px rgb(208, 210, 220) inset;
      border-radius: 50%;
      > section:nth-of-type(1) {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 40px;
        left: 40px;
        border-radius: 50%;
        box-shadow: 3px 3px rgb(149, 148, 147) inset;
        background: rgba(204, 204, 204, 0.7);
      }
      > section:nth-of-type(2) {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50px;
        left: 110px;
        border-radius: 50%;
        box-shadow: 1.3px 1.3px rgb(149, 148, 147) inset;
        background: rgba(204, 204, 204, 0.7);
      }
      > section:nth-of-type(3) {
        position: absolute;

        width: 50px;
        height: 50px;
        top: 90px;
        left: 80px;
        border-radius: 50%;
        box-shadow: 7px 7px rgb(149, 148, 147) inset;
        background: rgba(204, 204, 204, 0.7);
      }
      > section:nth-of-type(4) {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 22px;
        left: 135px;
        border-radius: 50%;
        box-shadow: 1px 1px rgb(149, 148, 147) inset;
        background: rgba(204, 204, 204, 0.7);
      }
    }

    /*red satellite*/
    > section:nth-of-type(2) {
      position: absolute;

      width: 50px;
      height: 50px;
      border-radius: 50%;
      top: 70%;
      left: 50%;

      transform: translate(-50%, -50%);
      box-shadow: -5px -5px rgba(0, 0, 0, 0.3) inset;
      background: #d7385e;
      cursor: pointer;
    }

    /*yellow satellite*/
    > section:nth-of-type(3) {
      position: absolute;

      width: 35px;
      height: 35px;
      border-radius: 50%;
      top: 70%;
      left: 50%;

      transform: translate(-50%, -50%);
      box-shadow: -2px -2px rgba(0, 0, 0, 0.3) inset;
      z-index: 10;
      background: #f3c623;
      cursor: pointer;
    }
  }
  @media (max-width: 960px) {
    > div:nth-of-type(1) {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
  }
  /*text wrapper*/
  > div:nth-of-type(2) {
    grid-column: 1 / span 6;
    overflow: hidden;
    position: absolute;
    align-self: center;
    margin: 0 1.2rem;

    line-height: 1.5rem;
    box-sizing: border-box;
    font-family: "DM Serif Display", serif;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
    @media (max-width: 960px) {
      position: relative;
      grid-template-rows: 1fr;

      margin: 0.5rem 1.2rem;
      box-sizing: border-box;
    }
    > div:nth-of-type(1) {
      display: grid;
      align-self: center;
      grid-row: 2 / span 1;
      @media (max-width: 960px) {
        grid-row: 1 / span 1;
      }
      position: relative;
      opacity: 0;
      > span {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000;
      }

      font-size: 1.6rem;
      line-height: 2.2rem;

      border-left: 6px solid #f3c623;
      padding: 0.8rem;
      box-sizing: border-box;
    }
    h5 {
      line-height: 2.4rem;
    }

    section {
      font-size: 1rem;
      margin-top: 1rem;
      color: #758184;
      font-size: 1.3rem;
    }
  }
`;

const Info = () => {
  const shadeRef = useRef();
  const planetRef = useRef();
  const redRef = useRef();
  const nameRef = useRef();
  const wrapperRef = useRef();
  const bioRef = useRef();
  const authorBlockerRef = useRef();
  const projectBlockerRef = useRef();
  const projectRef = useRef();
  const authorRef = useRef();
  const descRef = useRef();
  const skillRef = useRef();
  const goldRef = useRef();
  const width = useWidth();
  const [time, setTime] = useState(0);
  const [play, setPlay] = useState(true);
  const [tab, setTab] = useState("project");
  const update = useCallback(
    (el, radius, xRatio, yRatio, offset, speed) => {
      const angle = speed * time * 2;
      const x =
        radius * Math.cos((angle / 360) * (Math.PI * 2)) * xRatio - offset;
      const y =
        radius * Math.sin((angle / 360) * (Math.PI * 2)) * yRatio - offset;
      const screenY = (window.innerHeight * 2) / 3;

      const { y: currentY } = el.getBoundingClientRect();
      el.style.opacity = (0.8 * currentY) / screenY;
      if (currentY < screenY) {
        el.style.zIndex = 0;
      } else {
        el.style.zIndex = 10;
      }
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    [time]
  );

  useLayoutEffect(() => {
    const interval = setInterval(() => setTime((time) => time + 1), 26);
    return () => clearInterval(interval);
  }, []);

  const satellites = [
    {
      target: redRef,
      radius: 150,
      speed: 0.7,
      xRatio: 1.4,
      yRatio: 0.5,
      offset: 25,
    },
    {
      target: goldRef,
      radius: 170,
      speed: 0.5,
      xRatio: 1,
      yRatio: 0.6,
      offset: 10,
    },
  ];
  useLayoutEffect(() => {
    if (redRef.current && play) {
      satellites.forEach((s) => {
        update(
          s.target.current,
          s.radius,
          s.xRatio,
          s.yRatio,
          s.offset,
          s.speed
        );
      });
    }
  }, [time, play, satellites, update]);
  useLayoutEffect(() => {
    if (width < 480) {
      wrapperRef.current.style.gridColumn = "1 / span 2";
    } else {
      wrapperRef.current.style.gridColumn = "2 / span 1";
    }
  }, [width]);

  useLayoutEffect(() => {
    if (tab === "author") {
      const et = new TimelineMax();
      et.set(authorRef.current.children, {
        opacity: 0,
      })
        .set(authorRef.current, {
          height: "auto",
          width: "0px",
          opacity: 1,
        })
        .set(authorBlockerRef.current, {
          x: "-100%",
        })
        .set(authorRef.current, {
          width: "100%",
        })
        .set(authorBlockerRef.current, {
          opacity: 1,
        })
        .to(authorBlockerRef.current, 1, {
          x: "0px",
        })
        .set(authorRef.current.children, {
          opacity: 1,
        })
        .to(authorBlockerRef.current, 1, {
          x: "100%",
        })
        .set(authorBlockerRef.current, {
          display: "none",
        });
    } else if (tab === "project") {
      const et = new TimelineMax();
      et.set(projectRef.current.children, {
        opacity: 0,
      })
        .set(projectRef.current, {
          height: "auto",
          width: "0px",
          opacity: 1,
        })
        .set(projectBlockerRef.current, {
          x: "-100%",
        })
        .set(projectRef.current, {
          width: "100%",
        })
        .set(projectBlockerRef.current, {
          opacity: 1,
        })
        .to(projectBlockerRef.current, 1, {
          x: "0px",
        })
        .set(projectRef.current.children, {
          opacity: 1,
        })
        .to(projectBlockerRef.current, 1, {
          x: "100%",
        })
        .set(projectBlockerRef.current, {
          display: "none",
        });
    }
  }, [tab]);
  return (
    <InfoWrapper ref={wrapperRef}>
      <div>
        <div ref={shadeRef}></div>
        <section ref={planetRef}>
          <section></section>
          <section></section>
          <section></section>
          <section></section>
        </section>
        <section ref={redRef}></section>
        <section ref={goldRef}></section>
        <span onClick={() => setPlay(!play)}>
          {!play && <i className="fas fa-play"></i>}
          {play && <i className="fas fa-stop"></i>}
        </span>
        <h5>about</h5>
        <h4 onClick={() => setTab("author")}>Author</h4>
        <h4 onClick={() => setTab("project")}> Project</h4>
      </div>
      <div>
        {tab === "project" && (
          <div ref={projectRef}>
            <span ref={projectBlockerRef} style={{ background: "#f3c623" }} />
            <h5 ref={descRef}>
              This project is mainly an experiment on Redux saga and Nivo (chart
              library). Also, I couldn't find any elegant newsfeed Web app. They
              either have messy layout or covered with tons of ads (or even
              both), so I built one for myself. The stacks to build this Web
              app:
            </h5>

            <section ref={skillRef}>
              front-end: React, Redux, Redux-Saga, Nivo, GSAP, Styled-components
              <br />
              back-end: Node, Express
            </section>
          </div>
        )}
        {tab === "author" && (
          <div
            ref={authorRef}
            style={{
              borderLeft: "6px solid #d7385e",
            }}
          >
            <span ref={authorBlockerRef} style={{ background: "#d7385e" }} />
            <h5 style={{ fontSize: "2rem" }} ref={nameRef}>
              Sheng Hung Tsai
            </h5>
            <section
              style={{
                fontSize: "1.6rem",
              }}
              ref={bioRef}
            >
              Sheng was born and raised in Taiwan. He moved to Canada in 2014.
              He is a createive thinker, a cat lover and a web developer.
            </section>
          </div>
        )}
      </div>
    </InfoWrapper>
  );
};

export default Info;
