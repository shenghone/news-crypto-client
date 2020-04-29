import React, { useEffect, useCallback, useRef } from "react";
import Header from "../Components/Header/Header";
import NewsWrapper from "../Components/NewsWrapper/NewsWrapper";
import NavSection from "../Components/NavSection/NavSection";
import { useSelector, useDispatch } from "react-redux";
import setNavAction from "../redux/actions/setNavAction";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useWidth } from "../util";
import setKeywordAction from "../redux/actions/setKeywordAction";
import { NEWS } from "../redux/constants";
import resetQueryAction from "../redux/actions/resetQueryAction";

const AppWrapper = styled.div`
  background: #f9f6f7;
  grid-area: rest;
  position: relative;

  overflow: hidden;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px max-content auto;
  transition: 1s;
`;

const NewsBody = styled.div`
  grid-column: 1;
  grid-row: 3 / span 1;
  transition: 1s;
`;

function App() {
  const query = useSelector((state) => state.NEWS.query);
  const displayMenu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const displayNav = useSelector((state) => state.nav);
  const SET_NAV = useCallback((bool) => dispatch(setNavAction(bool)), [
    dispatch,
  ]);
  const width = useWidth();
  const { pathname } = useLocation();
  const KEYWORD = useSelector((state) => state.keyword.keyword);
  const RESET_KEYWORD = useCallback(() => dispatch(setKeywordAction("")), [
    dispatch,
  ]);
  const appWrapperRef = useRef();
  const LOAD_NEWS = useCallback(() => {
    dispatch({ type: NEWS.LOAD });
  }, [dispatch]);

  useEffect(() => {
    LOAD_NEWS();
  }, [LOAD_NEWS, query, KEYWORD]);
  useEffect(() => {
    if (pathname && pathname !== "/world" && pathname !== "/") {
      const path = pathname.split("/")[1];
      dispatch(resetQueryAction(path));
    } else {
      dispatch(resetQueryAction("general"));
    }
  }, [pathname, dispatch]);
  useEffect(() => {
    RESET_KEYWORD();
  }, [pathname, RESET_KEYWORD]);
  useEffect(() => {
    if (!displayMenu) {
      appWrapperRef.current.style.transition = "1s";
      appWrapperRef.current.style.gridColumn = "1 / span 2";
    } else {
      appWrapperRef.current.style.transition = "1s";
      appWrapperRef.current.style.gridColumn = "2 / span 1";
    }
  }, [displayMenu]);

  useEffect(() => {
    if (width > 960) {
      SET_NAV(true);
    }
  }, [SET_NAV, width]);

  const getNewsBody = (bool, width) => {
    if (width > 960) {
      return (
        <>
          <NavSection />
          <NewsBody>
            <NewsWrapper />
          </NewsBody>
        </>
      );
    } else {
      if (displayNav) {
        return <NavSection />;
      }
      return (
        <NewsBody>
          <NewsWrapper />
        </NewsBody>
      );
    }
  };

  return (
    <AppWrapper ref={appWrapperRef} displayMenu={displayMenu}>
      <Header />

      {getNewsBody(displayNav, width)}
    </AppWrapper>
  );
}

export default App;
