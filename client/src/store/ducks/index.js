import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";

import user from "./user";
import restaurants from "./restaurants";
import history from "./history";
import cart from "./cart";
import menu from "./menu"

export default combineReducers({
  user,
  restaurants,
  history,
  cart,
  menu,
  toastr
}); 
