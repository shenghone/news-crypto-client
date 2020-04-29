import { CRYPTO } from "../constants";

const selectCryptoAction = selectedCrypto => ({
  type: CRYPTO.SELECT,
  selectedCrypto
});

export default selectCryptoAction;
