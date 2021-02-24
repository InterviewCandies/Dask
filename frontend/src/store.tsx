import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";
import boardReducer from "./reducers/board";
import usersReducer from "./reducers/users";
import taskReducer from "./reducers/task";

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  users: usersReducer,
  task: taskReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
