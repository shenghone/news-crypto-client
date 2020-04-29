import { CRYPTO } from "../../constants";

const loadingCryptoDataReducer = (state = false, action) => {
  switch (action.type) {
    case CRYPTO.LOAD:
      return true;
    case CRYPTO.LOAD_SUCCESS:
      return false;
    case CRYPTO.LOAD_FAIL:
      return false;
    case CRYPTO.SET_CRYPTO_PARAM:
      return true;
    default:
      return state;
  }
};

export default loadingCryptoDataReducer;
