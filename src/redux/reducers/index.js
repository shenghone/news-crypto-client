import { combineReducers } from "redux";
import newsDataReducer from "./news/newsDataReducer";
import pageReducer from "./news/pageReducer";
import loadingNewsReducer from "./news/loadingNewsReducer";
import cryptoDataReducer from "./crypto/cryptoDataReducer";
import loadingCryptoDataReducer from "./crypto/loadingCryptoDataReducer";
import menuReducer from "./menu/menuReducer";
import keywordReducer from "./news/keywordReducer";
import navReducer from "./nav/navReducer";

const rootReducer = combineReducers({
  NEWS: newsDataReducer,
  LOADING: loadingNewsReducer,
  page: pageReducer,
  CRYPTO: cryptoDataReducer,
  CRYPTO_LOADING: loadingCryptoDataReducer,
  menu: menuReducer,
  nav: navReducer,
  keyword: keywordReducer,
});

export default rootReducer;
