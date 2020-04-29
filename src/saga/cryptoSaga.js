import { CRYPTO } from "../redux/constants";
import { takeLatest, call, put, select } from "redux-saga/effects";
import setCryptoAction from "../redux/actions/setCryptoAction";
import selectCryptoAction from "../redux/actions/selectCryptoAction";
import axios from "axios";

const BACK_END_URL = process.env.REACT_APP_BACK_END;
const getParam = (state) => state.CRYPTO.param;

function* handleCryptoLoad() {
  try {
    const query = yield select(getParam);

    const axiosConfig = {
      method: "get",
      url: BACK_END_URL + `/crypto/${query}`,
      header: {
        Accept: "application/json; odata=nometadata",
      },
    };

    const {
      data: { periodicalData, topFiveCrypto, tickers, error },
    } = yield call(axios, axiosConfig);
    yield put(selectCryptoAction(topFiveCrypto));
    yield put(setCryptoAction(periodicalData, topFiveCrypto, tickers, error));
  } catch (err) {
    console.log(err);
  }
}

export default function* watchCryptoLoad() {
  yield takeLatest(CRYPTO.LOAD, handleCryptoLoad);
}
