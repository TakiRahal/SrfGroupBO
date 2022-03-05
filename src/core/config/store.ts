import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import DevTools from './devtools';
import errorMiddleware from './error-middleware';
import loggerMiddleware from './logger-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import reducer, {IRootState} from "../../shared/reducers";
import notificationMiddleware from './notification-middleware';


const defaultMiddlewares = [
  thunkMiddleware,
  errorMiddleware,
  notificationMiddleware,
  promiseMiddleware,
  loadingBarMiddleware(),
  loggerMiddleware,
];
const composedMiddlewares = (middlewares: any) =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares), DevTools.instrument())
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
