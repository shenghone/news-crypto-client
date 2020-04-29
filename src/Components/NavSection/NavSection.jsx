import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import setNavAction from "../../redux/actions/setNavAction";
import { useSelector, useDispatch } from "react-redux";
import { TimelineMax, Back } from "gsap";

const NavSectionWrapper = styled.section`
  font-family: "Caladea", serif;
  section {
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  }
  @media (max-width: 960px) {
    color: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40%);
    font-size: 0.9rem;
    > nav {
      position: relative;
      display: ${(props) => (props.displayMenu ? "grid" : "none")};
      align-self: center;
      justify-self: center;
      > section {
        font-weight: bolder;
        margin: 1rem 0;
        box-sizing: border-box;
      }
    }
  }
  @media (min-width: 960px) {
    position: relative;
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    margin: 2rem 0px;
    box-sizing: border-box;

    nav {
      section {
        color: #000;
        font-weight: bold;
        font-size: 0.8rem;
        text-decoration: none;
        opacity: 0;

        text-align: center;
      }
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: 1fr;
      justify-self: center;

      display: grid;
      position: absolute;

      justify-items: stretch;
    }
  }
`;

const NavSection = () => {
  const { pathname: path } = useLocation();
  const history = useHistory();
  const navRef = React.useRef(null);
  const dispatch = useDispatch();
  const SET_NAV = (bool) => dispatch(setNavAction(bool));
  const displayMenu = useSelector((state) => state.menu);
  const handleResetQuery = (q) => {
    SET_NAV(false);
    if (!path.includes(q)) {
      if (q !== "general") {
        history.push(`/${q}`);
      } else {
        history.push("/general");
      }
    }
  };
  React.useEffect(() => {
    if (navRef && navRef.current) {
      const et = new TimelineMax();

      et.set(navRef.current.children, {
        opacity: 0,
        x: 20,
        scaleX: 1.1,
      });
      et.staggerTo(
        navRef.current.children,
        0.4,
        {
          opacity: 1,
          ease: Back.easeOut.config(1.7),
          scaleX: 1,
          x: 0,
          delay: 1,
        },
        0.1
      );
    }
  }, []);
  return (
    <NavSectionWrapper displayMenu={displayMenu}>
      <nav ref={navRef}>
        <section onClick={() => handleResetQuery("general")}>General</section>
        <section onClick={() => handleResetQuery("cryptocurrency")}>
          Cryptocurrency
        </section>
        <section onClick={() => handleResetQuery("health")}>Health</section>
        <section onClick={() => handleResetQuery("technology")}>
          Technology
        </section>
        <section onClick={() => handleResetQuery("sports")}>Sports</section>
        <section onClick={() => handleResetQuery("business")}>Business</section>
        <section onClick={() => handleResetQuery("science")}>Science</section>
        <section onClick={() => handleResetQuery("entertainment")}>
          Entertainment{" "}
        </section>
      </nav>
    </NavSectionWrapper>
  );
};

export default NavSection;
