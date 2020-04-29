import { NAV } from "../constants";

const setNavAction = (bool) => ({
  type: NAV.DISPLAY,
  display: bool,
});

export default setNavAction;
