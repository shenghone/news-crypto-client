import { NEWS } from "../constants";

const setKeywordAction = (keyword) => ({
  type: NEWS.SET_SEARCH_KEYWORD,
  keyword,
});

export default setKeywordAction;
