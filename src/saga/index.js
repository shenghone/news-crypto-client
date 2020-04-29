import { all } from "redux-saga/effects";
import newsSaga from "./newsSaga";
import cryptoSaga from "./cryptoSaga";

export default function* rootSaga() {
  yield all([cryptoSaga(), newsSaga()]);
}
