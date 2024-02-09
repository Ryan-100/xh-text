import { createStore, applyMiddleware } from 'redux';
import * as Thunk from 'redux-thunk';
import reducers from './root';

const store = createStore(reducers, applyMiddleware(Thunk.thunk));

export default store;
