import { NEWS } from "../constants";

const handleKeywordChangeAction = (input) => ({
  type: NEWS.HANDLE_KEYWORD_CHANGE,
  userInput: input,
});

export default handleKeywordChangeAction;
