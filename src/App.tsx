import React from 'react';
import './App.scss';
import {
    BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";
import {ALL_APP_ROUTES} from "./core/config/all-app-routes";
import SignIn from "./main-features/signin/SignIn";
import MainAdmin from "./shared/layout/main-admin/MainAdmin";
import {IRootState} from "./shared/reducers";
import {logout} from "./shared/reducers/user-reducer";
import {connect} from "react-redux";
import { hot } from 'react-hot-loader';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export interface IAppProps extends StateProps, DispatchProps {}

function App(props: IAppProps) {
  return (
      <Router>
          <div className="App">

              <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />

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
