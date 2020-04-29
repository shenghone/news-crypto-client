import { NEWS } from "../constants";

const setNewsAction = (news, total, status) => ({
  type: NEWS.LOAD_SUCCESS,
  newsData: news,
  total: total,
  status
});

export default setNewsAction;
