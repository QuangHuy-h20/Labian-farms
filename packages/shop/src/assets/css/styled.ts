import styled, { css } from "styled-components";

interface HeaderProps {
  scrollDirection: string;
  scrolledToTop: boolean;
}

export const StyledMain = styled.main`
  counter-reset: section;
`;

export const StyledHeader = styled.header<HeaderProps>`

  height: var(--nav-height);
  padding: 0 50px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  background-color: #fff;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    ${(props) =>
      props.scrollDirection === "up" &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: #fff;
        box-shadow: 0px 10px 6px -5px rgb(186 186 186 / 75%);
      `};

    ${(props) =>
      props.scrollDirection === "down" &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 -1px 6px -5px rgb(182 182 182 / 75%);
      `};
  }
`;
