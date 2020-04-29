import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddelware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "../saga";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddelware();
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
