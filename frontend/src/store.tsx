import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";
import boardReducer from "./reducers/board";
import usersReducer from "./reducers/users";
const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  users: usersReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
