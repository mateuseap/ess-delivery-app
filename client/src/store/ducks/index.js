import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";

import user from "./user";
import restaurants from "./restaurants";
import mapInfo from "./mapInfo";
import history from "./history";

export default combineReducers({
  user,
  restaurants,
  mapInfo,
  history,
  toastr,
});
