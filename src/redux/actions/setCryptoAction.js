import { CRYPTO } from "../constants";

const setCryptoDataAction = (periodicalData, topFiveCrypto, tickers, error) => {
  return {
    type: CRYPTO.LOAD_SUCCESS,
    periodicalData,
    topFiveCrypto,
    tickers,
    error
  };
};

export default setCryptoDataAction;
