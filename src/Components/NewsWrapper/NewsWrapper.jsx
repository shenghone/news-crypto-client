import React from "react";
import styled from "styled-components";
import NewsCard from "../NewsCard/NewsCard";
import { v5 } from "uuid";
import { useSelector } from "react-redux";

const NewsStyleWrapper = styled.div`
  margin-bottom: 1rem;
  height: auto;
  @media (max-width: 960px) {
    display: grid;
    grid-template-rows: 400px 1fr;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    width: 100%;

    grid-row-gap: 20px;
    i {
      display: none;
    }
  }
  @media (max-width: 620px) {
    grid-row-gap: 30px;
    grid-template-rows: auto auto;
    grid-row-gap: 0px;
  }

  @media (min-width: 960px) {
    position: relative;
    width: 100%;

    display: grid;
    grid-template-columns: 6% 1fr 6%;
    grid-template-rows: 350px 420px;
    grid-template-areas:
      "headline headline headline"
      "leftArrow restOfTheNews rightArrow";
    grid-row-gap: 40px;
    overflow: hidden;
    justify-content: center;
    i:nth-of-type(1) {
      grid-area: leftArrow;
      display: grid;
      box-sizing: border-box;

      place-items: center;
    }
    i:nth-of-type(2) {
      grid-area: rightArrow;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }
  }
`;

const FirstNews = styled.div`
  @media (max-width: 960px) {
    width: 90%;
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    justify-self: center;
    margin-top: 1rem;
  }
  @media (max-width: 620px) {
    width: 100%;
  }
  @media (min-width: 960px) {
    position: relative;
    grid-area: headline;
    display: grid;
  }
`;

const RestOfTheNews = styled.div`
  @media (max-width: 960px) {
    display: flex;
    width: 90%;
    position: relative;
    justify-self: center;
    height: 100%;

    flex-wrap: wrap;
    grid-column: 1 / span 2;
  }

  @media (min-width: 960px) {
    position: absolute;
    box-sizing: border-box;
    grid-area: restOfTheNews;
    display: flex;
    overflow: scroll;
    width: 100%;
    ::-webkit-scrollbar-thumb {
      background: red;
      border-radius: 0px;
    }
    justify-self: center;
  }
`;

const NewsWrapper = () => {
  const news = useSelector((state) => state.NEWS.news);

  return (
    <NewsStyleWrapper>
      {news && news.length > 0 && (
        <>
          <FirstNews>
            <NewsCard data={news[0]} idx={0} direction="grid" />
          </FirstNews>
          {news.length > 1 && (
            <>
              <i className="fas fa-arrow-alt-circle-left"></i>
              <RestOfTheNews>
                {news.map((n, idx) => {
                  if (idx >= 1) {
                    return (
                      <NewsCard
                        key={v5(n.url, v5.URL)}
                        data={n}
                        idx={idx}
                        direction="flex"
                      />
                    );
                  } else return null;
                })}
                <NewsCard data={null} direction="flex" />
              </RestOfTheNews>
              <i className="fas fa-arrow-alt-circle-right"></i>
            </>
          )}
        </>
      )}
    </NewsStyleWrapper>
  );
};

export default NewsWrapper;
