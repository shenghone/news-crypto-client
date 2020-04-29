import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { ResponsiveLine } from "@nivo/line";

const CryptoOverviewWrapper = styled.div`
  height: auto;
  display: grid;
  border-radius: 3px;

  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background: #fff;
  border-left: 2px solid ${(props) => props.data[0].color};
  box-sizing: border-box;
  padding: 1.5rem;
  grid-template-areas:
    "number"
    "chart";
  position: relative;

  > div:nth-of-type(1) {
    grid-area: number;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;

    > p {
      padding-top: 0;
      color: #6c7b95;
      font-size: 0.9rem;
      font-weight: 700;
    }
    > p:nth-of-type(1) {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }
    > p:nth-of-type(2) {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
      font-size: 1.1rem;
      color: #6c7b95;
      opacity: 0.5;
    }
    > p:nth-of-type(3) {
      grid-column: 3 / span 1;
      grid-row: 1 / span 1;
      font-weight: 400;
    }
    @media (min-width: 769px) {
      > p:nth-of-type(2) {
        display: none;
      }
    }
  }
  > div:nth-of-type(2) {
    height: 100px;
    min-width: 0;
  }
`;

const CryptoOverview = ({
  data,
  overview: { name, quotes, ...restOfOverview },
}) => {
  const percentageRef = React.useRef(null);

  const param = useSelector((state) => state.CRYPTO.param);

  React.useLayoutEffect(() => {
    if (percentageRef.current) {
      const value = percentageRef.current.innerHTML.split("%")[0];
      if (parseFloat(value) > 0) {
        percentageRef.current.style.color = "#55ae95";
      } else {
        percentageRef.current.style.color = "#f67280";
      }
    }
  }, [param]);
  const getPriceDelta = (data) => {
    const priceArr = Object.values(data[0].data);
    const start = priceArr[0].y;
    const current = priceArr[priceArr.length - 1].y;
    const val = parseFloat(((current - start) / current) * 100).toFixed(2);
    return val;
  };
  return (
    <CryptoOverviewWrapper data={data}>
      <div>
        <p>{name}/USD</p>
        <p>{parseFloat(quotes.USD.price).toFixed(2)}</p>
        <p ref={percentageRef}>{getPriceDelta(data)}%</p>
      </div>

      <div>
        <ResponsiveLine
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          enableArea={true}
          areaOpacity={0.03}
          xScale={{
            type: "time",
            format: "%Y-%m-%d %H:%M",
            precision: "minute",
          }}
          xFormat="time:%Y-%m-%d %H:%M"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          colors={(d) => d.color}
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={0}
          isInteractive={false}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 0,
              itemTextColor: "transparent",
              itemHeight: 0,
              itemOpacity: 0,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(256,256,256, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(256,256,256, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </CryptoOverviewWrapper>
  );
};

export default CryptoOverview;
