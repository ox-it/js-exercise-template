import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router'
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import reducer from './store/reducers';

export default () => {
    const logger = createLogger();
    
    let middlewares = [promise, routerMiddleware(hashHistory)];
    let preloadedState = undefined;
    
    if(window.DEV_ENV) {
        middlewares = [...middlewares, logger]
        preloadedState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    }
    
    let store = createStore(
        reducer,
        preloadedState,
        applyMiddleware(...middlewares)
    );
    
    return store;
}