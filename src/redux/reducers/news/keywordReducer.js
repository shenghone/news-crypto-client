import { NEWS } from "../../constants";

const initialState = {
  userInput: "",
  keyword: "",
};

const keywordReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS.SET_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case NEWS.HANDLE_KEYWORD_CHANGE:
      return {
        ...state,
        userInput: action.userInput,
      };
    default:
      return state;
  }
};

export default keywordReducer;
