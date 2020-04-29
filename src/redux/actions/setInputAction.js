import { NEWS } from "../../constants";

const setInputAction = (input) => ({
  type: NEWS.HANDLE_KEYWORD_CHANGE,
  input,
});

export default setInputAction;
