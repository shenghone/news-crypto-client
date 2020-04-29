import { NEWS } from "../constants";

const resetQueryAction = query => ({
  type: NEWS.RESET,
  query
});

export default resetQueryAction;
