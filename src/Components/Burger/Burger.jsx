import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import setMenuAction from "../../redux/actions/setMenuAction";
import styled from "styled-components";

const BurgerWrapper = styled.i`
  color: "#6c7b95";
  width: "30px";
  height: "30px";
  border: "1px solid transparent";
  border-radius: "5px";
  box-shadow: "1px 1px 5px rgba(0;0;0;0.4)";
  padding: "8px";
  transition: 1s;
  box-sizing: "border-box";
  z-index: 100;
`;

const Burger = ({ style, ...rest }) => {
  const menuStatus = useSelector((state) => state.menu);
  const burgerRef = useRef();

  const dispatch = useDispatch();
  const SET_MENU = (bool) => dispatch(setMenuAction(bool));
  const handleClick = (bool) => {
    SET_MENU(bool);
  };
  return (
    <BurgerWrapper
      ref={burgerRef}
      onClick={() => handleClick(!menuStatus)}
      className="fas fa-bars"
      style={{ style }}
    ></BurgerWrapper>
  );
};

export default Burger;
