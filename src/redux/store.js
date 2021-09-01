import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];  //applyMiddleware takes in array
//we could have passed logger to applyMiddleware like createStore(rootReducer, applyMiddleware(logger));
//We only do it this way because it's more scalable
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //we spread all the values from middlewares array
//with this, we're written our store. All we have to do now is export our store
export default store;
