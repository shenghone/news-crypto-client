import React, { useRef, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useWidth from "../../customHook/useWidth";
import resetQueryAction from "../../redux/actions/resetQueryAction";
import { useDispatch, useSelector } from "react-redux";
import setMenuAction from "../../redux/actions/setMenuAction";
import setNavAction from "../../redux/actions/setNavAction";
import styled, { keyframes } from "styled-components";

export const whiteToBlack = keyframes`
  0%{
    color: #fff
  }
  100%{
    color: #000;
  }
`;
const DashboardWrapper = styled.div`
  z-index: 999;
  grid-area: dashboard;
  min-height: 600px;
  height: 100vh;
  width: auto;
  background: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5% 5% 5% 20% repeat(6, 1fr) 30%;
  grid-row-gap: 15px;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
  font-family: "Roboto";
  font-size: 12px;
  box-shadow: 5px 0px 50px rgba(0, 0, 0, 0.09);
  opacity: 0;
  > div {
    padding: 0px 15px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    &:hover {
      background: #fff;
      > * {
        animation: ${whiteToBlack} 1s forwards;
      }
    }
  }

  span {
    margin: 0 10px;
    color: rgba(241, 249, 249, 0.75);
    text-align: strech;
  }
`;

const Dashboard = () => {
  const width = useWidth();
  const location = useLocation();
  const history = useHistory();
  const menuStatus = useSelector((state) => state.menu);
  const menuRef = useRef();
  const navStatus = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const SET_MENU = useCallback((bool) => dispatch(setMenuAction(bool)), [
    dispatch,
  ]);
  const SET_NAV = useCallback((bool) => dispatch(setNavAction(bool)), [
    dispatch,
  ]);
  const handleTo = (where) => {
    if (location.pathname !== "/world") {
      dispatch(resetQueryAction("random"));
      history.push(where);
    } else {
      history.push(where);
    }
  };

  const getColor = (currentPath, targetPath) => {
    if (!Array.isArray(targetPath)) {
      return currentPath === targetPath ? "#88e1f2" : "#6c7b95";
    } else if (targetPath.length > 0) {
      const cp = currentPath.split("/")[1];

      if (targetPath.includes(cp)) {
        return "#88e1f2";
      }
      return "#6c7b95";
    }
  };
  useEffect(() => {
    if (!menuStatus) {
      menuRef.current.style.transition = "1s";
      menuRef.current.style.transform = "translateX(-100%)";
    }
    if (menuStatus) {
      menuRef.current.style.transition = "1s";
      menuRef.current.style.transform = "translateX(0%)";
      menuRef.current.style.opacity = 1;
    }
  }, [menuStatus]);

  useEffect(() => {
    if (width && width <= 480) {
      SET_MENU(false);
    } else if (width && width > 480) {
      SET_MENU(true);
    }
  }, [width, SET_MENU]);
  const handleClick = () => {
    if (width && width <= 960) {
      SET_NAV(false);
    }
    SET_MENU(!menuStatus);
  };

  const NAVS = [
    "general",
    "",
    "entertainment",
    "business",
    "health",
    "cryptocurrency",

    "science",
    "sports",
    "technology",
  ];
  const getVisibility = () => {
    const currentPath = location.pathname.split("/")[1];
    if (NAVS.includes(currentPath)) {
      return true;
    }
    return false;
  };
  const getNewsIconBorder = (path) => {
    const p = path.split("/")[1];

    if (NAVS.includes(p)) {
      return "3px solid #88e1f2";
    }
    return "3px solid transparent";
  };
  return (
    <DashboardWrapper ref={menuRef} width={width}>
      <div
        style={{
          gridRow: "2 / span 1",
          gridColumn: "1 / span 1",
          justifyContent: "center",
          borderRight: "3px solid transparent",
          borderLeft: "3px solid transparent",
          alignItems: "center",
        }}
        onClick={() => handleClick()}
      >
        {menuStatus && (
          <i
            className="fas fa-times"
            style={{
              color: "#6c7b95",
              width: "30px",
              height: "30px",
              border: "1px solid transparent",
              borderRadius: "5px",
              boxShadow: "1px 1px 5px rgba(0,0,0,0.4)",
              padding: "8px 5px 8px 10px",
              boxSizing: "border-box",
            }}
          ></i>
        )}

        {width > 960 && menuStatus && (
          <span style={{ flex: 3, color: "#6c7b95" }}>close</span>
        )}
      </div>
      {width <= 960 && (
        <div
          onClick={() => SET_NAV(!navStatus)}
          style={{
            placeItems: "center",
            gridRow: "3 / span 1",
            gridColumn: "1 / span 1",
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            display: getVisibility() ? "flex" : "none",
          }}
        >
          <i
            className="far fa-compass"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid transparent",
              borderRadius: "5px",
              boxShadow: "1px 1px 5px rgba(0,0,0,0.4)",
              padding: "8px",
              boxSizing: "border-box",
              flex: 1,
              color: "#6c7b95",
            }}
          ></i>
        </div>
      )}
      <div
        onClick={() => handleTo("/general")}
        style={{
          placeItems: "center",
          gridRow: "5 / span 1",
          gridColumn: "1 / span 1",
          borderLeft: getNewsIconBorder(location.pathname),

          borderRight: "3px solid transparent",
          color: getColor(location.pathname, ["/", "general"]),
          display: "flex",
        }}
      >
        <i
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid transparent",
            borderRadius: "5px",
            boxShadow: "1px 1px 5px rgba(0,0,0,0.4)",
            padding: "8px",
            boxSizing: "border-box",
            flex: 1,
            color: getColor(location.pathname, NAVS),
          }}
          className="fas fa-newspaper"
        ></i>
        {width > 960 && (
          <span style={{ flex: 3, color: getColor(location.pathname, NAVS) }}>
            news
          </span>
        )}
      </div>
      <div
        onClick={() => handleTo("/crypto")}
        style={{
          gridRow: "6 / span 1",
          gridColumn: "1 / span 1",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "3px solid transparent",
          borderLeft:
            location.pathname.includes("crypto") &&
            location.pathname !== "/cryptocurrency"
              ? "3px solid #88e1f2"
              : "3px solid transparent",
          display: "flex",
          color:
            location.pathname.includes("crypto") &&
            location.pathname !== "/cryptocurrency"
              ? "#88e1f2"
              : "#6c7b95",
        }}
      >
        <i
          style={{
            width: "30px",
            height: "30px",

            border: "1px solid transparent",
            borderRadius: "5px",
            boxShadow: "1px 1px 5px rgba(0,0,0,0.4)",
            padding: "8px",
            boxSizing: "border-box",
            flex: 1,
          }}
          className="fab fa-bitcoin"
        ></i>
        {width > 960 && (
          <span
            style={{
              flex: 3,
              color:
                location.pathname.includes("crypto") &&
                location.pathname !== "/cryptocurrency"
                  ? "#88e1f2"
                  : "#6c7b95",
            }}
          >
            crypto
          </span>
        )}
      </div>
      <div
        onClick={() => handleTo("/info")}
        style={{
          gridRow: "7 / span 1",
          gridColumn: "1 / span 1",
          justifyContent: "center",
          borderRight: "3px solid transparent",
          alignItems: "center",
          borderLeft:
            location.pathname === "/info"
              ? "3px solid #88e1f2"
              : "3px solid transparent",
          display: "flex",
          color: getColor(location.pathname, "/info"),
        }}
      >
        <i
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid transparent",
            borderRadius: "5px",
            boxShadow: "1px 1px 5px rgba(0,0,0,0.4)",
            padding: "8px",
            boxSizing: "border-box",
            flex: 1,
          }}
          className="fas fa-info-circle"
        ></i>
        {width > 960 && (
          <span
            style={{ flex: 3, color: getColor(location.pathname, "/info") }}
          >
            about
          </span>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
