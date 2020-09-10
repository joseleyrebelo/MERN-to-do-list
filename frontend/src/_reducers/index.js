import { combineReducers } from "redux";
import counter from "./counter-reducer";

const rootReducer = combineReducers({
  counter: counter,
});

export default rootReducer;
