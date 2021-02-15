import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authentioncationReducer from "./reducers/authenticate";
import boardReducer from "./reducers/board";
const rootReducer = combineReducers({
  authentication: authentioncationReducer,
  boards: boardReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
