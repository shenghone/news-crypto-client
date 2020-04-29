import { takeLatest, call, put, select } from "redux-saga/effects";
import { NEWS } from "../redux/constants";
import setNewsAction from "../redux/actions/setNewsAction";
import axios from "axios";

const BACK_END_URL = process.env.REACT_APP_CRYPTO_BACK_END;
const getPage = (state) => state.page;
const getQuery = (state) => state.NEWS.query;
const getNewsData = (state) => state.NEWS.news;
const getTotal = (state) => state.NEWS.total;
const getSearchKeyword = (state) => state.keyword.keyword;
const getFilteredNews = (state) => state.NEWS.filtered;
function* handleNewsLoad() {
  const page = yield select(getPage);
  const availableNews = yield select(getTotal);
  const query = yield select(getQuery);
  const keyword = yield select(getSearchKeyword);
  const axiosConfig = {
    method: "get",
    url:
      BACK_END_URL +
      `top-headlines?category=${query}&keyword=${keyword}&page=${page}`,
  };
  try {
    const {
      data: { articles, totalResults, status },
    } = yield call(axios, axiosConfig);

    //first load

    if (!availableNews) {
      yield put(setNewsAction(articles, totalResults, status));
    } else {
      const newsData = yield select(getNewsData);
      const filteredNews = yield select(getFilteredNews);

      if (newsData.length + filteredNews < availableNews) {
        yield put(setNewsAction(articles, totalResults, status));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export default function* watchNewsLoad() {
  yield takeLatest(NEWS.LOAD, handleNewsLoad);
}
