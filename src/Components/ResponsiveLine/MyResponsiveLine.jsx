import React from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../util";
import { ResponsiveLine } from "@nivo/line";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const theme = {
  textColor: "#6c7b95",
  fontSize: 11,
  axis: {
    legend: {
      text: {
        fill: "#000",
        fontSize: "16px",
        fontWeight: "300",
      },
    },
  },
};
const MyResponsiveLine = ({ data /* see data tab */ }) => {
  const param = useSelector((state) => state.CRYPTO.param);
  const width = useWidth();
  const getTickValues = (param) => {
    switch (param) {
      case "1d":
        return "every 3 hour";
      case "7d":
        return "every 1 day";
      case "1m":
        return "every 1 week";
      case "1y":
        return "every 1 month";
      case "5y":
        return "every 1 year";
      default:
        return "every 1 year";
    }
  };
  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: 25,
        right: width <= 960 ? (width <= 768 ? 115 : 135) : 155,
        bottom: 100,
        left: width <= 960 ? (width <= 768 ? 100 : 110) : 130,
      }}
      enableArea={false}
      areaOpacity={0.07}
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
      theme={theme}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 4,
        tickValues: getTickValues(param),
        tickPadding: 5,
        tickRotation: 70,
        legend: "date",
        legendOffset: 80,
        format: "%m-%d %H:%M",
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "USD",
        legendOffset: -80,
        legendPosition: "middle",
        format: (value) =>
          value % 1000 === 0 ||
          value % 100 === 0 ||
          (value < 500 && value % 10 === 0) ||
          value <= 10
            ? new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(value).toFixed(3))
            : null,
      }}
      enableGridX={false}
      colors={{ scheme: "dark2" }}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
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
  );
};

export default MyResponsiveLine;
