import { CRYPTO } from "../constants";

const setParamAction = param => ({
  type: CRYPTO.SET_CRYPTO_PARAM,
  param
});

export default setParamAction;
