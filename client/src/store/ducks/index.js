import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";

import user from "./user";

export default combineReducers({
  user,
  toastr,
});
