import React from "react";
import styled from "styled-components";
import { useWidth } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import selectCryptoAction from "../../redux/actions/selectCryptoAction";
import bitcoin from "../../Assets/btc-bitcoin.svg";
import eth from "../../Assets/eth-ethereum.svg";
import bch from "../../Assets/bch-bitcoin-cash.svg";
import usdt from "../../Assets/usdt-tether.svg";
import xrp from "../../Assets/xrp-xrp.svg";
import bnb from "../../Assets/bnb-binance-coin.svg";
import usdc from "../../Assets/usdc-usd-coin.svg";
import sol from "../../Assets/solana-icon.svg"

const CryptoButtonWrapper = styled.div`
  font-family: "Roboto";
  user-select: none;
  @media (min-width: 960px) {
    margin-top: 30px;
    display: grid;
    grid-template-rows: 20px 20px;
    grid-template-columns: 10% 40px 6% 1fr 10% 10%;
    grid-template-areas:
      ". icon .. cryptoName add"
      ". icon .. cryptoPrice add";
    > img {
      border: 1px solid transparent;
      border-radius: 5px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
    }
  }

  > img {
    display: grid;
    align-self: center;
    grid-area: icon;
    width: 30px;
    height: 30px;

    box-sizing: border-box;
    grid-area: icon;
    padding: 6px;
  }
  > i {
    grid-area: add;
    align-self: center;
    color: #12cad6;
    @media (max-width: 959px) {
      display: none;
    }
  }
  > h5 {
    grid-area: cryptoName;
    text-transform: uppercase;
    padding: 2px;
    font-size: 0.9rem;
  }
  > p {
    grid-area: cryptoPrice;
    padding: 0;
  }
  @media (max-width: 959px) {
    margin: 0 5px;
    padding: 2px;
    flex-basis: 0px;
    flex-grow: 1;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
    display: flex;
    > img {
      color: red;
    }
    > p {
      font-weight: 200;
      margin: auto;
      display: flex;
      text-align: center;
      padding-right: 6px;
    }

    h5 {
      display: none;
    }
    :hover {
      cursor: pointer;
    }
  }
`;

const CryptoButton = ({ id, xx, currentPrice, idx }) => {
  const dispatch = useDispatch();
  const SELECT_CRYPTO = (id) => dispatch(selectCryptoAction(id));
  const SELECTED_CRYPTO = useSelector((state) => state.CRYPTO.selectedCrypto);
  const width = useWidth();
  const getAddOrMinus = () => {
    if (SELECTED_CRYPTO.includes(id)) {
      return (
        <i style={{ color: "#f65c78" }} className="fas fa-minus-square"></i>
      );
    }
    return <i className="fas fa-plus-square"></i>;
  };
  const getBorder = (selectedCrypto, self) => {
    if (selectedCrypto.includes(self)) {
      return "2px solid #88e1f2";
    }
    return "#fff";
  };
  const getLogo = (id) => {
    switch (id) {
      case "btc-bitcoin":
        return bitcoin;
      case "eth-ethereum":
        return eth;
      case "usdt-tether":
        return usdt;
      case "xrp-xrp":
        return xrp;
      case "bch-bitcoin-cash":
        return bch;
      case "bnb-binance-coin":
        return bnb;
        case "usdc-usd-coin":
          return usdc;
      case "sol-solana":
        return sol;
      default:
        return;
    }
  };
  const getName = (id) => {
    switch (id) {
      case "btc-bitcoin":
        return "Bitcoin";
      case "eth-ethereum":
        return "Ethereum";
      case "usdt-tether":
        return "Tether";
      case "usdc-usd-coin":
        return "USDC";
      case "xrp-xrp":
        return "XRP";
      case "bnb-binance-coin":
        return "BNB";
      case "bch-bitcoin-cash":
        return "Bitcoin-cash";
      case "sol-solana":
          return "Solana";
      default:
        return;
    }
  };
  return (
    <CryptoButtonWrapper
      style={{ border: width < 960 && getBorder(SELECTED_CRYPTO, id) }}
      id={id}
      idx={idx}
      onClick={() => SELECT_CRYPTO(id)}
    >
      <img src={getLogo(id)} alt="" />
      <h5>{getName(id)}</h5>
      <p>{`$${currentPrice.toFixed(2)}`}</p>
      {getAddOrMinus()}
    </CryptoButtonWrapper>
  );
};

export default CryptoButton;
