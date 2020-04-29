import dayjs from "dayjs";

const colorSchema = [
  "rgba(38,157,120,0.8)",
  "rgba(215,95,28,0.8)",
  "rgba(190,141,33,0.9)",
  "rgba(229,48,138,0.8)",
  "rgba(104,165,48,1)",
  "rgba(173,128,30,0.9)",
];

const restructureCryptoData = (data) => {
  if (data && data.length > 0) {
    return data.reduce((result, crypto, idx) => {
      const d = crypto.data.reduce((axisArray, singleDayData) => {
        return axisArray.concat({
          x: dayjs(singleDayData.timestamp)
            .subtract(
              dayjs(singleDayData.timestamp).toDate().getTimezoneOffset(),
              "minute"
            )
            .format("YYYY-MM-DD HH:mm"),
          y: singleDayData.price,
        });
      }, []);
      return result.concat({
        id: crypto.id,
        color: colorSchema[idx],
        data: d,
      });
    }, []);
  } else {
    return;
  }
};

export default restructureCryptoData;
