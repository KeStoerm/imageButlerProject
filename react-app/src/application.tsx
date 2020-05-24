import React from "react";
import {Route, HashRouter as Router, Switch} from "react-router-dom";
import {Routes} from "./router/routes";
import {hot} from "react-hot-loader/root";
import {Header} from "./components/header/header";
import {Footer} from "./components/footer/footer";
import "./template/style.scss";
import {SearchWrapper} from "./components/searchWrapper/searchWrapper";
import {ImageDetails} from "./components/imageDetails/imageDetails";

const Application: React.FC = () => (
  <div className="container is-fluid application-body">
    <Router>
      <Header />
      <Switch>
        <Route exact path={Routes.Home}>
          <SearchWrapper />
        </Route>
        <Route exact path={Routes.Image} component={ImageDetails}/>
        <Route exact path={Routes.Error}>
          <span>404</span>
        </Route>
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default hot(Application);