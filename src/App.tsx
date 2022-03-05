import React from 'react';
import logo from './logo.svg';
import './App.scss';
import SiderBar from "./shared/layout/side-bar/SideBar";
import LayoutRoutes from "./shared/layout-routes/LayoutRoutes";
import Header from "./shared/layout/header/Header";
import Footer from "./shared/layout/footer/Footer";
import {
    BrowserRouter as Router, Link, Route, Switch, useHistory
} from "react-router-dom";
import {ALL_APP_ROUTES} from "./core/config/all-app-routes";
import SignIn from "./main-features/signin/SignIn";
import MainAdmin from "./shared/layout/main-admin/MainAdmin";
import {IRootState} from "./shared/reducers";
import {logout} from "./shared/reducers/user-reducer";
import {connect} from "react-redux";
import { hot } from 'react-hot-loader';

export interface IAppProps extends StateProps, DispatchProps {}

function App(props: IAppProps) {
  return (
      <Router>
          <div className="App">
              <Switch>
                  <Route path={ALL_APP_ROUTES.SIGNIN}>
                      <SignIn />
                  </Route>

                  <Route path={ALL_APP_ROUTES.MAIN_ADMIN}>
                      <MainAdmin {...props} />
                  </Route>

                  <Route path="*">
                      <SignIn />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

const mapStateToProps = ({user, address}: IRootState) => ({
    isAuthenticated: user.isAuthenticated,
    currentUser: user.currentUser,

});

const mapDispatchToProps = {  logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
