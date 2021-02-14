import { createStore } from "redux";
import { reducer } from "./reducers/authenticate";
const store = createStore(reducer);

export default store;
