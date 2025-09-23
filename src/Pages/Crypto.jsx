import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../util";
import { whiteToBlack } from "../Components/Nav/NavArea";
import { CRYPTO } from "../redux/constants";
import { useHistory } from "react-router-dom";
import setMenuAction from "../redux/actions/setMenuAction";
import Loader from "../Components/Loader/Loader";
import MyResponsiveLine from "../Components/ResponsiveLine/MyResponsiveLine";
import CryptoButton from "../Components/CryptoButton/CryptoButton";
import CryptoOverview from "../Components/CryptoOverview/CryptoOverview";
import { gsap } from "gsap";
import setParamAction from "../redux/actions/setParamAction";
import { v4 as uuidv4 } from "uuid";

import styled, { keyframes } from "styled-components";
import dayjs from "dayjs";

const CryptoWrapper = styled.div`
  box-sizing: border-box;
  padding-bottom: 1rem;
  grid-area: rest;
  height: 100%;
  overflow: hidden;
  background: #f9f6f7;
  overflow-y: scroll;
  display: grid;

  color: #6c7b95;
  position: relative;
  transition: 1s;
  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    grid-template-rows: 80px auto;
    grid-template-areas: "space" "chartArea";
  }
  @media (min-width: 960px) {
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 1fr;
    grid-template-areas: "chartArea selectionArea";
  }
`;

const expandAndShrink = keyframes`
  0%{
    transform:scale(1.2);
  }
  100%{
    transform:scale(1);
  }
`;

const changeColor = keyframes`
  from{
    color: #000;
  }
  to{
    color: #fff;
  }
`;

/*three children under, date and duration area, main chart and detailed chart area*/

const ChartAreaWrapper = styled.div`
  h4 {
    opacity: 0.5;
    letter-spacing: 0.1rem;
  }
  p {
    padding: 1rem 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  button {
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
    padding: 6px;
    width: 30px;
    border: 1px solid transparent;
    height: 30px;
    margin: 20px 5px 0px 5px;
    background: #fff;
    outline: none;
    cursor: pointer;

    &:active {
      animation: ${expandAndShrink} 3s forwards;
    }
    &:hover {
      background: #000;
      animation: ${changeColor} 1s forwards;
      transition: 1.2s;
    }
  }
  /*crypto overview container*/
  > div:nth-of-type(3) {
    display: grid;

    padding: 1rem;
    width: 90%;
    justify-self: center;
    box-sizing: border-box;
    z-index: 10;
    grid-row: 4 / span 1;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 20px;
    grid-auto-flow: dense;
  }
  @media (max-width: 959px) {
    grid-area: chartArea;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 1fr;

    box-sizing: border-box;
    > div:nth-of-type(1) {
      /*three children underneath, title/date, 1d,7d,1m button area and menu burger*/
      justify-self: center;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: 80px 80px;
      width: 80%;

      grid-row: 1 / span 1;
      display: grid;
      margin: 0 auto;
      box-sizing: border-box;
      > div:nth-of-type(1) {
        display: grid;
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
      }
      > div:nth-of-type(2) {
        grid-column: 3 / span 1;
        grid-row: 1 / span 1;
        z-index: 10;
      }
      > div:nth-of-type(3) {
        display: none;
      }
    }
    @media (max-width: 768px) {
      > div:nth-of-type(1) {
        grid-template-columns: auto 4% auto 1fr;
        grid-template-rows: 80px auto;
        > div:nth-of-type(1) {
          grid-column: 3 / span 2;
        }
        > div:nth-of-type(2) {
          justify-self: end;
          grid-column: 2 / span 3;
          grid-row: 2 / span 1;
        }
        /*burger*/
        > div:nth-of-type(3) {
          display: grid;
          justify-self: end;
          grid-column: 1 / span 1;
          grid-row: 1 / span 1;
          place-items: center;
          align-self: center;
          cursor: pointer;
          &:hover {
            > * {
              animation: ${whiteToBlack} 1s forwards;
            }
          }
        }
      }
    }
    /*main chart container*/
    > div:nth-of-type(2) {
      position: relative;

      grid-row: 2 / span 1;
      margin: auto;
      width: 95%;
      z-index: 99;
      min-width: 0;
    }
    > div:nth-of-type(3) {
      grid-row: 3 / span 1;
      margin: auto;
    }
  }
  @media (min-width: 960px) {
    box-sizing: border-box;
    grid-area: chartArea;
    display: grid;
    width: 100%;

    overflow-x: hidden;
    grid-template-rows: 130px 30px 1fr 1fr;
    grid-template-columns: 1fr;
    ::-webkit-scrollbar {
      display: none;
    }

    /*whole row of "Cryptocurrency and date"*/
    > div:nth-of-type(1) {
      grid-template-columns: 6% auto 4% 1fr 30% 8%;
      grid-template-rows: 1fr;
      display: grid;
      grid-row: 1 / span 1;
      align-self: end;

      > div:nth-of-type(1) {
        grid-column: 4 / span 1;
      }
      > div:nth-of-type(2) {
        display: flex;
        align-items: center;
        align-self: center;
        grid-column: 5 / span 1;
        > button {
          margin-top: 0;
        }
      }
      > div:nth-of-type(3) {
        display: grid;
        place-items: center;
        grid-row: 1 / span 1;
        grid-column: 2 / span 1;
        &:hover {
          cursor: pointer;
          > * {
            animation: ${whiteToBlack} 1s forwards;
          }
        }
      }
    }

    > div:nth-of-type(2) {
      position: relative;
      max-width: 900px;

      grid-row: 3 / span 1;
      margin: auto 1rem;
      width: 100%;
      min-width: 0;
      @media (min-width: 1280px) {
        justify-self: center;
      }
    }
  }
`;

const SelectionAreaWrapper = styled.div`
  position: sticky;
  box-sizing: border-box;
  padding: 0;

  @media (max-width: 959px) {
    grid-area: chartArea;
    display: grid;
    grid-template-rows: 80px 80px;
    grid-template-columns: 1fr;
    > div:nth-of-type(1) {
      display: none;
    }
    > div:nth-of-type(2) {
      z-index: 10;
      grid-row: 2 / span 1;
      justify-self: center;
      display: flex;
      justify-content: center;
      width: 80%;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 960px) {
    box-shadow: 5px 0px 50px rgba(0, 0, 0, 0.09);
    display: grid;

    grid-template-rows: 200px 1fr;
    grid-template-columns: 1fr;

    > div:nth-of-type(1) {
      border-bottom: 1px solid #ddd;
      width: 100%;
      display: grid;
      > h5 {
        align-self: end;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: #000;
        font-weight: bold;
        padding: 0.8rem 1.5rem;
      }
    }

    > div:nth-of-type(2) {
      display: grid;
      grid-template-columns: 1fr;

      grid-template-rows: repeat(5, 50px);
    }
  }
`;

const Crypto = ({ match: { params }, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const width = useWidth();
  const menuStatus = useSelector((state) => state.menu);
  const selectedCrypto = useSelector((state) => state.CRYPTO.selectedCrypto);
  const topFiveCrypto = useSelector((state) => state.CRYPTO.topFiveCrypto);
  const cryptoData = useSelector((state) => state.CRYPTO.periodicalData);
  const tickers = useSelector((state) => state.CRYPTO.tickers);
  const [periodicalDataMap, setPeriodicalDataMap] = React.useState(new Map());
  const [priceMap, setPriceMap] = React.useState(new Map());
  const CRYPTO_DATA_ISLOADING = useSelector((state) => state.CRYPTO_LOADING);
  const QUERY = useSelector((state) => state.CRYPTO.param);
  const burgerRef = useRef();

  const cryptoWrapperRef = useRef();
  const SET_MENU = (bool) => dispatch(setMenuAction(bool));
  const SET_PARAM = useCallback((p) => dispatch(setParamAction(p)), [dispatch]);


  console.log(tickers);
  console.log(cryptoData)
  useEffect(() => {
    if (tickers && tickers.length > 0) {
      const tm = tickers.reduce((newMap, ticker) => {
        return newMap.set(ticker.id, ticker.ticker);
      }, new Map());
      setPriceMap(tm);
    }
  }, [tickers]);

  useEffect(() => {
    if (cryptoData && cryptoData.length > 0) {
      const cd = cryptoData.reduce((newMap, crypto) => {
        return newMap.set(crypto.id, crypto.data);
      }, new Map());
      setPeriodicalDataMap(cd);
    }
  }, [cryptoData]);

  useEffect(() => {
    const { period } = params;
    if (!period) {
      SET_PARAM("1d");
    } else {
      SET_PARAM(period);
    }
  }, [params, SET_PARAM]);

  const LOAD_CRYPTO_DATA = useCallback(() => {
    dispatch({ type: CRYPTO.LOAD });
  }, [dispatch]);

  useEffect(() => {
    LOAD_CRYPTO_DATA();
  }, [LOAD_CRYPTO_DATA, QUERY]);

  const handleTo = (p) => {
    history.push(`/crypto/${p}`);
  };

  const handleBurgerClick = (bool) => {
    SET_MENU(bool);
  };

  const cryptoDataForRendering = cryptoData.filter((c) => {
    return selectedCrypto.includes(c.id);
  });
  const getBorder = (query, self) => {
    if (query === self) {
      return "2px solid #88e1f2";
    }
    return "2px solid transparent";
  };
  const getColor = (query, self) => {
    return "#000 ";
  };
  useEffect(() => {
    if (!menuStatus) {
      cryptoWrapperRef.current.style.gridColumn = "1 / span 2";
    } else if (width <= 960 && menuStatus) {
      cryptoWrapperRef.current.style.gridColumn = "2 / span 1";
    } else if (width <= 480) {
      cryptoWrapperRef.current.style.gridColumn = "1 / span 2";
    } else if (width > 960) {
      cryptoWrapperRef.current.style.gridColumn = "2 / span 1";
    }
  }, [width, menuStatus]);

  useEffect(() => {
    if (!menuStatus) {
      gsap.set(burgerRef.current, {
        y: 5,
        opacity: 0,
      });
      gsap.to(burgerRef.current, 1, {
        delay: 0.6,
        y: 0,
        opacity: 1,
      });
    }
  }, [menuStatus]);
  return (
    <CryptoWrapper ref={cryptoWrapperRef}>
      <ChartAreaWrapper>
        <div>
          <div>
            <h4>Cryptocurrency</h4>
            <p>{dayjs(new Date()).format("YYYY MMM DD, ddd")}</p>
          </div>

          <div>
            <button
              style={{
                border: getBorder(QUERY, "1d"),
                color: getColor(QUERY, "1d"),
              }}
              onClick={() => handleTo("1d")}
            >
              1d
            </button>
            <button
              style={{
                border: getBorder(QUERY, "7d"),
                color: getColor(QUERY, "7d"),
              }}
              onClick={() => handleTo("7d")}
            >
              7d
            </button>
            <button
              style={{
                border: getBorder(QUERY, "1m"),
                color: getColor(QUERY, "1m"),
              }}
              onClick={() => handleTo("1m")}
            >
              1m
            </button>
            <button
              style={{
                border: getBorder(QUERY, "1y"),
                color: getColor(QUERY, "1y"),
              }}
              onClick={() => handleTo("1y")}
            >
              1y
            </button>
            <button
              style={{
                border: getBorder(QUERY, "5y"),
                color: getColor(QUERY, "5y"),
              }}
              onClick={() => handleTo("5y")}
            >
              5y
            </button>
          </div>
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
        </div>

        <div
          style={{
            position: "relative",
            minWidth: "0",
            display: selectedCrypto.length === 0 && "grid",
            placeItems: selectedCrypto.length === 0 && "center",
            height: "400px",
          }}
        >
          {(!cryptoData ||
            cryptoData.length === 0 ||
            CRYPTO_DATA_ISLOADING) && <Loader />}
          {cryptoData &&
            cryptoData.length > 0 &&
            !CRYPTO_DATA_ISLOADING &&
            selectedCrypto.length > 0 && (
              <>
                <MyResponsiveLine data={cryptoDataForRendering} />
                <a
                  style={{
                    position: "absolute",
                    top: width > 960 ? "0" : "",
                    bottom: width > 960 ? "" : "13px",
                    right:
                      width > 960 ? "100px" : width < 768 ? "20px" : "60px",
                    textDecoration: "none",
                    fontWeight: 100,
                    fontSize: "0.8rem",
                    color: "#000",
                    opacity: 0.7,
                  }}
                  href="https://coinpaprika.com/api/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source: coinpaprika
                </a>
              </>
            )}
          {cryptoData &&
            cryptoData.length > 0 &&
            !CRYPTO_DATA_ISLOADING &&
            selectedCrypto.length === 0 && (
              <section
                style={{
                  color: "#f0134d",
                  fontSize: "1.3rem",

                  letterSpacing: "0.01rem",
                  fontWeight: "500",
                }}
              >
                select a cryptocurrency to start
              </section>
            )}
        </div>
        {!CRYPTO_DATA_ISLOADING && (
          <div>
            {priceMap.size > 0 &&
              periodicalDataMap.size > 0 &&
              cryptoData.map((c) => {
                return (
                  <CryptoOverview
                    key={uuidv4()}
                    overview={priceMap.get(c.id)}
                    data={[c]}
                  />
                );
              })}
          </div>
        )}
      </ChartAreaWrapper>
      <SelectionAreaWrapper>
        <div>
          <h5>top five crypto</h5>
        </div>
        {topFiveCrypto &&
          topFiveCrypto.length > 0 &&
          priceMap &&
          priceMap.size !== 0 && (
            <div>
              {topFiveCrypto.map((c, idx) => {
                return (
                  <CryptoButton
                    key={uuidv4()}
                    xx={c}
                    currentPrice={priceMap.get(c.id).quotes.USD.price}
                    idx={idx}
                    id={c.id}
                  />
                );
              })}
            </div>
          )}
      </SelectionAreaWrapper>
    </CryptoWrapper>
  );
};

export default Crypto;
