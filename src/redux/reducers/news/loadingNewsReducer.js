import { NEWS } from "../../constants";

const loadingNewsReducer = (state = false, action) => {
  switch (action.type) {
    case NEWS.LOAD:
      return true;
    case NEWS.LOAD_SUCCESS:
      return false;
    case NEWS.LOAD_FAIL:
      return false;
    default:
      return state;
  }
};

export default loadingNewsReducer;
