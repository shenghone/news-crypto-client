import { NAV } from "../../constants";

const navReducer = (state = false, action) => {
  if (action.type === NAV.DISPLAY) {
    return action.display;
  }
  return state;
};

export default navReducer;
