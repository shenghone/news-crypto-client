import { NEWS } from "../../constants";

const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case NEWS.RESET:
      return 1;
    case NEWS.LOAD_SUCCESS:
      return state + 1;

    default:
      return state;
  }
};

export default pageReducer;
