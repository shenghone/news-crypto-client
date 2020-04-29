import { NEWS } from "../../constants";

const initialState = {
  news: [],
  otherNews: [],
  total: null,
  filtered: 0,
  status: null,
  query: "general",
  error: null,
  keyword: "",
};

const newsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS.RESET:
      return {
        ...state,
        news: [],
        total: null,
        filtered: 0,
        status: null,
        query: action.query,
      };

    case NEWS.LOAD_SUCCESS:
      let val = [];
      let err = "";
      let filtered = state.filtered;
      if (action.newsData) {
        let newsMap = new Map();

        if (state.news.length > 0) {
          for (const n of state.news) {
            newsMap.set(n.urlToImage, n);
          }
        }

        val = [...action.newsData]
          //filter out the data without image
          .filter((d) => {
            if (!d.urlToImage) {
              filtered += 1;
            }
            return d;
          })

          //filter out news with same url or same image url from saga
          .reduce((final, current, idx) => {
            if (idx === 0) {
              return final.concat({ ...current });
            } else {
              let tempNews = final.filter((f) => {
                if (
                  f.url === current.url ||
                  f.urlToImage === current.urlToImage ||
                  f.title === current.title
                ) {
                  filtered += 1;
                }
                return (
                  f.url !== current.url &&
                  f.urlToImage !== current.urlToImage &&
                  f.title !== current.title
                );
              });
              return tempNews.concat({ ...current });
            }
          }, []);
        //filter out news with same url or same image url from redux state
        if (newsMap.size > 0) {
          val = val.reduce((result, current) => {
            if (newsMap.get(current.urlToImage)) {
              filtered += 1;
              return result;
            } else {
              return result.concat({ ...current });
            }
          }, []);
        }
      } else {
        return {
          error: "Error accessing data",
        };
      }
      return {
        ...state,
        news: state.news.concat(val),
        total: action.newsData && action.newsData.length > 0 ? action.total : 0,
        filtered: action.filtered ? 0 : filtered,
        status: action.status,
        error: err,
      };
    default:
      return state;
  }
};

export default newsDataReducer;
