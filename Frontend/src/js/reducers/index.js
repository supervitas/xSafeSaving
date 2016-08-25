import {combineReducers} from "redux";
import files from "./userFiles";
import user from "./user";

export default combineReducers({
  files,
  user,
})
