import React from "react";
import styled, { css } from "styled-components";
import { COLOR } from "../pages/_app";

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${COLOR.light};
  color: ${COLOR.light};
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  transition: 0.5s;
  ${(props) =>
    props.primary &&
    css`
      background: ${COLOR.light};
      color: ${COLOR.dark};
    `}
  &:hover {
    transform: scale(1.05);
  }
`;

export default function Button({ primary, children }) {
  return <StyledButton primary={primary}>{children}</StyledButton>;
}
