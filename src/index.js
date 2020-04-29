import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Pages/App";
import Crypto from "./Pages/Crypto";
import Info from "./Pages/Info";
import * as serviceWorker from "./serviceWorker";
import Dashboard from "./Components/Nav/NavArea";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux";

const store = configureStore();
//business entertainment general health science sports technology
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={Dashboard}></Route>
      <Switch>
        <Route exact path="/crypto/:period" component={Crypto} />
        <Route exact path="/crypto" component={Crypto} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/" component={App} />

        <Route exact path="/business" component={App} />
        <Route exact path="/cryptocurrency" component={App} />
        <Route exact path="/health" component={App} />
        <Route exact path="/technology" component={App} />
        <Route exact path="/sports" component={App} />
        <Route exact path="/science" component={App} />
        <Route exact path="/entertainment" component={App} />

        <Route exact path="/general" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
