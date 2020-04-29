import { MENU } from "../../constants";

const menuReducer = (state = true, action) => {
  switch (action.type) {
    case MENU.DISPLAY:
      return action.toDisplay;
    default:
      return state;
  }
};

export default menuReducer;
