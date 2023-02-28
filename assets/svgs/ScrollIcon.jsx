import React from "react";
import styled, { keyframes } from "styled-components";
// .scroll_icon {
//     animation: bounce;
//     animation-duration: 5s;
//     animation-iteration-count: infinite;
//     animation-delay: 2s;
//   }
//   .scroll_icon--fadeIn {
//     opacity: 0;
//     animation: fadeInScroll forwards;
//     margin: 0 auto;
//     animation-duration: 1s;
//     animation-delay: 0.5s;
//     transform: translateY(25px) translateX(50%);
//   }
//   @keyframes fadeInScroll {
//     0% {
//       opacity: 0;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
const bounce = keyframes`0% {
  transform: scale(1, 1) translateY(0);
}
5% {
  transform: scale(1.1, 0.9) translateY(0);
}
15% {
  transform: scale(0.9, 1.1) translateY(-50%);
}
25% {
  transform: scale(1.05, 0.95) translateY(0);
}
30% {
  transform: scale(1, 1) translateY(-30%);
}
35% {
  transform: scale(1, 1) translateY(0);
}
100% {
  transform: scale(1, 1) translateY(0);
}`;
const fadeIn = keyframes`
 0% {
       opacity: 0;
     }
     100% {
       opacity: 1;
     }`;
const StyledScrollIcon = styled.svg`
  animation: ${bounce};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-delay: 2s;
`;
const StyledFadeIn = styled.span`
  opacity: 0;
  animation: ${fadeIn} forwards;
  margin: 0 auto;
  animation-duration: 1s;
  animation-delay: 0.5s;
  transform: translateY(25px) translateX(50%);
`;
export default function ScrollIcon({ primary = "white", secondary = "black" }) {
  return (
    <StyledFadeIn>
      <StyledScrollIcon
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="31"
        viewBox="0 0 16 31"
      >
        <g id="Desktop" transform="translate(-0.461 0.391)">
          <g id="Sustainability">
            <g id="ARROW">
              <g id="Arrow-2" data-name="Arrow">
                <rect
                  id="Rectangle"
                  width="16"
                  height="31"
                  rx="7"
                  transform="translate(0.461 -0.391)"
                  fill={primary}
                />
                <g id="Group-7" transform="translate(4.172 7.857)">
                  <g id="Group-6" transform="translate(0 10.592) rotate(-45)">
                    <circle
                      id="Oval"
                      cx="1.209"
                      cy="1.209"
                      r="1.209"
                      transform="translate(0 3.825)"
                      fill={secondary}
                    />
                    <path
                      id="Path-18"
                      d="M0,3.181V0"
                      transform="translate(0.739 0)"
                      fill="none"
                      stroke={secondary}
                      stroke-width="1"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path-18-Copy-2"
                      d="M0,3.181V0"
                      transform="translate(2.815 5.256) rotate(-90)"
                      fill="none"
                      stroke={secondary}
                      stroke-width="1"
                      fill-rule="evenodd"
                    />
                  </g>
                  <path
                    id="Path-21"
                    d="M4,11.181V0"
                    transform="translate(0.289 0)"
                    fill="none"
                    stroke={secondary}
                    stroke-width="1"
                    fill-rule="evenodd"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </StyledScrollIcon>
    </StyledFadeIn>
  );
}
