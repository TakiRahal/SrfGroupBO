import logger from 'redux-logger';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const defaultMiddlewares: any[] = [
    sagaMiddleware,
    // websocketMiddleware
]

if(process.env.NODE_ENV === 'development'){
    defaultMiddlewares.push(logger);
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(defaultMiddlewares),
    devTools: process.env.NODE_ENV !== 'production',
});

// then run the saga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
