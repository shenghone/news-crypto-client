import { MENU } from "../constants";

const setMenuAction = (display) => ({
  type: MENU.DISPLAY,
  toDisplay: display,
});

export default setMenuAction;
