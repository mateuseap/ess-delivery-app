import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";

import user from "./user";
import restaurants from "./restaurants";

export default combineReducers({
  user,
  restaurants,
  toastr,
});
