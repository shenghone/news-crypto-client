import { CRYPTO } from "../../constants";
import restructureCryptoData from "../../../util/restructureCryptoData";

const initialState = {
  periodicalData: [],
  topFiveCrypto: [],
  tickers: [],
  error: null,
  selectedCrypto: [],
  param: "1d"
};

const cryptoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CRYPTO.LOAD_SUCCESS:
      return {
        ...state,
        periodicalData: restructureCryptoData(action.periodicalData),
        topFiveCrypto: action.topFiveCrypto,
        tickers: action.tickers,
        error: action.error
      };
    case CRYPTO.SET_CRYPTO_PARAM:
      return {
        ...state,
        param: action.param
      };
    case CRYPTO.SELECT:
      //flatten the object to array when first loading
      if (typeof action.selectedCrypto === "object") {
        const sc = action.selectedCrypto.reduce((selected, current, idx) => {
          if (idx < 3) {
            return selected.concat(current.id);
          }
          return selected;
        }, []);
        return {
          ...state,
          selectedCrypto: sc
        };
      }
      if (state.selectedCrypto.includes(action.selectedCrypto)) {
        return {
          ...state,
          selectedCrypto: state.selectedCrypto.filter(
            s => s !== action.selectedCrypto
          )
        };
      }
      return {
        ...state,
        selectedCrypto: state.selectedCrypto.concat(action.selectedCrypto)
      };
    default:
      return state;
  }
};

export default cryptoDataReducer;
