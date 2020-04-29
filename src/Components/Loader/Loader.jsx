import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0%{
        transform: scale(1)
    }
    50%{
        transform: scale(1.9)
    }
    70%{
        transform: scale(0.6)
    }
    100%{
        transform: scale(1)
    }
    
`;

const translateAndFadeOut = keyframes`
    0%{
        transform: translateX(25px) ;
        opacity: 1;
    }
    100%{
        transform: translateX(-25px) r;
        opacity: -1;
    }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 400px;
  justify-content: center;
  margin: auto;
  transform: scale(0.7);

  > div {
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: blur(0.3px) contrast(2);
  }
  > div:nth-of-type(odd) {
    animation: ${translateAndFadeOut} 2.5s ease infinite;
  }
  > div:nth-of-type(even) {
    animation: ${pulse} 1.2s ease-in-out infinite;
    animation: ${translateAndFadeOut} 2.5s ease infinite;
  }
  > div:nth-of-type(1) {
    width: 10px;
    animation-delay: 0.5s;
    height: 10px;
  }
  > div:nth-of-type(2) {
    animation-delay: 0.7s;
  }
  > div:nth-of-type(3) {
    animation-delay: 1.2s;
  }

  > div:nth-of-type(4) {
    animation-delay: 1.5s;
    width: 25px;
    height: 25px;
  }
  > div:nth-of-type(5) {
    animation-delay: 2s;
  }
  > div:nth-of-type(6) {
    animation-delay: 2.6s;
  }
  > div:nth-of-type(7) {
    width: 10px;
    height: 10px;
  }
`;

const Loader = memo(() => {
  return (
    <LoaderWrapper>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderWrapper>
  );
});

export default Loader;
