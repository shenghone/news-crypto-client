import React, { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import handleKeywordChangeAction from "../../redux/actions/handleKeywordChangeAction";
import { whiteToBlack } from "../Nav/NavArea";
import setMenuAction from "../../redux/actions/setMenuAction";
import styled from "styled-components";
import { gsap } from "gsap";
import resetQueryAction from "../../redux/actions/resetQueryAction";
import axios from "axios";
import dayjs from "dayjs";
import setKeywordAction from "../../redux/actions/setKeywordAction";

const HeaderWrapper = styled.div`
  position: relative;
  width: 95%;
  top: 0;
  display: grid;
  grid-template-columns: 7fr 3fr;
  grid-template-rows: 1fr;

  > h2 {
    font-family: "Dancing Script", cursive;
    position: absolute;
    font-weight: 700;
    display: grid;
    place-items: center;
    color: #000;
    opacity: 0;
    font-size: 1.4rem;
  }

  > div:nth-of-type(1) {
    position: relative;
    font-family: "Crimson Text", serif;
    font-size: 0.8rem;
    width: 90%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    section {
      margin: 0px 0px 0px 15px;
      opacity: 0;
    }
    font-weight: 700;

    color: rgba(57, 62, 70, 0.5);
    box-sizing: border-box;
    > section:nth-of-type(3) {
      position: absolute;
      width: 90%;
      background: rgba(57, 62, 70, 0.5);
      height: 0.8px;
    }
  }
  > div:nth-of-type(2) {
    position: relative;
    grid-column: 2 / span 1;
    width: 100%;
    height: 100%;
    display: grid;
    justify-self: end;
    display: grid;
    grid-template-columns: 85% auto;
    grid-template-rows: auto;

    align-items: end;
    box-sizing: border-box;
    > section {
      opacity: 0;
      position: absolute;
      bottom: 0;
      background: rgba(57, 62, 70, 0.5);
      height: 0.8px;
      width: 100%;
    }
    input {
      grid-column: 1 / span 1;

      width: 100%;
      border: none;
      outline: none;

      padding: 8px 5px;
      background: transparent;
      &::placeholder {
        font-family: "Crimson Text", serif;
      }
    }
    i {
      margin-bottom: 5px;
      grid-column: 2 / span 1;
      display: grid;
      justify-self: center;
      width: 10%;
      :hover {
        color: #cecece;
        cursor: pointer;
      }
    }
  }
  div:nth-of-type(3) {
    position: absolute;
    justify-self: left;
    margin-left: 32px;
    opacity: 0;
    > i {
      cursor: pointer;

      &:hover {
        animation: ${whiteToBlack} 1s forwards;
      }
    }
  }
  display: grid;
  place-items: center;
`;

const getDate = () => {
  const TODAY = new Date();
  return dayjs(TODAY).format("dddd. MMM DD, YYYY");
};

const Header = () => {
  const menuStatus = useSelector((state) => state.menu);
  const [weather, setWeather] = useState(null);
  const burgerRef = useRef();
  const dateWeatherRef = useRef();
  const titleRef = useRef();
  const QUERY = useSelector((state) => state.NEWS.query);
  const searchIconRef = useRef();
  const borderLeftRef = useRef();
  const borderRightRef = useRef();
  const dispatch = useDispatch();
  const input = useSelector((state) => state.keyword.userInput);
  const SET_INPUT = (input) => dispatch(handleKeywordChangeAction(input));
  const SET_MENU = (bool) => dispatch(setMenuAction(bool));
  const inputRef = useRef();
  const RESET_DATA = (q) => dispatch(resetQueryAction(q));
  const handleBurgerClick = (bool) => {
    SET_MENU(bool);
  };

  const getWeatherIcon = (data) => {
    const CURRENT_WEATHER = data.weather[0].main.toUpperCase();
    if (CURRENT_WEATHER.includes("CLOUDS")) {
      return <i className="fas fa-cloud"></i>;
    } else if (CURRENT_WEATHER.includes("RAIN")) {
      return (
        <i
          style={{ position: "relative", transform: "translate(0px,0.5px)" }}
          className="fas fa-cloud-rain"
        ></i>
      );
    } else if (CURRENT_WEATHER.includes("CLEAR")) {
      return (
        <i
          style={{ position: "relative", transform: "translate(0px,1px)" }}
          className="far fa-sun"
        ></i>
      );
    } else if (CURRENT_WEATHER.includes("SNOW")) {
      return (
        <i
          className="fas fa-snowflake"
          style={{ position: "relative", transform: "translate(0px,0.5px)" }}
        ></i>
      );
    }
  };
  React.useEffect(() => {
    const getWeather = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=toronto,on,ca&units=metric&appid=${process.env.WEATHER_API_KEY}`
        );
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };
    getWeather();
  }, []);

  useLayoutEffect(() => {
    if (!menuStatus) {
      gsap.set(burgerRef.current, {
        opacity: 0,
        y: -5,
      });
      gsap.to(burgerRef.current, 1, {
        delay: 1.2,
        y: 0,
        opacity: 1,
      });
    }
  }, [menuStatus]);
  const handleChange = (e) => {
    SET_INPUT(e.target.value);
  };

  const SET_KEYWORD = (k) => dispatch(setKeywordAction(k));
  const handleSearch = (k) => {
    RESET_DATA(QUERY);
    SET_KEYWORD(k);
  };

  useLayoutEffect(() => {
    if (weather && Object.values(weather).length > 0) {
      gsap.set(inputRef.current, {
        opacity: 0,
      });
      gsap.to(inputRef.current, 2, {
        delay: 2.6,
        opacity: 1,
      });
      gsap.set(
        [
          dateWeatherRef.current.children[0],
          dateWeatherRef.current.children[1],
        ],

        {
          opacity: 0,
          y: 15,
        }
      );
      gsap.to(
        [
          dateWeatherRef.current.children[0],
          dateWeatherRef.current.children[1],
        ],
        1,
        {
          delay: 2.6,
          opacity: 1,
          y: 0,
        }
      );
      gsap.set(searchIconRef.current, {
        opacity: 0,
      });
      gsap.to(searchIconRef.current, 1, {
        opacity: 1,
        delay: 2.8,
      });
      gsap.set(borderLeftRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left",
      });
      gsap.to(borderLeftRef.current, 1, {
        delay: 2,
        opacity: 1,
        scaleX: 1,
      });
      gsap.set(borderRightRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "right",
      });
      gsap.to(borderRightRef.current, 1, {
        delay: 2,
        opacity: 1,
        scaleX: 1,
      });

      gsap.set(titleRef.current, {
        y: 20,
      });
      gsap.to(titleRef.current, 1, {
        delay: 2.2,
        opacity: 1,
        y: 0,
      });
    }
  }, [weather]);
  return (
    <HeaderWrapper>
      <h2 ref={titleRef}>yours' daily</h2>
      {weather && (
        <div ref={dateWeatherRef}>
          <section>{getDate()}</section>
          <section>
            {getWeatherIcon(weather)} {`${parseInt(weather.main.temp)}°C`}
          </section>
          <section ref={borderLeftRef}></section>
        </div>
      )}
      {weather && (
        <div>
          <input
            ref={inputRef}
            placeholder="search from current news"
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <i
            ref={searchIconRef}
            onClick={() => handleSearch(input)}
            className="fas fa-search"
          ></i>
          <section ref={borderRightRef}></section>
        </div>
      )}
      {!menuStatus && (
        <div ref={burgerRef} onClick={() => handleBurgerClick(true)}>
          <i
            className="fas fa-bars"
            style={{
              color: "#6c7b95",
              width: "32px",
              height: "32px",
              border: "1px solid transparent",
              borderRadius: "5px",
              boxShadow: "1px 1px 5px rgba(0,0,0,0.4)",
              padding: "8px",
              boxSizing: "border-box",
              transform: "scale(0.8)",
            }}
          />
        </div>
      )}
    </HeaderWrapper>
  );
};

export default Header;
