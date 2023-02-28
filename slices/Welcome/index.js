import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { TypeAnimation } from "react-type-animation";
import styled, { keyframes } from "styled-components";
import overlay from "../../assets/imgs/overlay.png";
import { COLOR } from "../../pages/_app";
/**
 * @typedef {import("@prismicio/client").Content.WelcomeSlice} WelcomeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WelcomeSlice>} WelcomeProps
 * @param { WelcomeProps }
 */
const fadeIn = keyframes`
from{
  opacity:0;
}to{
  opacity:1;
}
`;
const StyledLanding = styled.section`
  background: ${COLOR.dark};
  color: ${COLOR.light};
  position: relative;
`;
// const StyledVideo = styled.iframe`
//   opacity: 0;
//   animation: ${fadeIn};
//   animation-duration: 1s;
//   animation-delay: 3.5s;
//   animation-fill-mode: forwards;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 100vw;
//   height: 100vh;
//   transform: translate(-50%, -50%);
//   @media (min-aspect-ratio: 16/9) {
//     height: 56.25vw;
//   }
//   @media (max-aspect-ratio: 16/9) {
//     width: 177.78vh;
//   }
// `;

const StyledVideoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.8071603641456583) 8%,
      rgba(0, 0, 0, 0.3029586834733894) 100%
    ),
    url(${overlay.src});
  background-repeat: repeat;
  background-size: 4px;
  top: 0;
  left: 0;
`;
const StyledBackgroundLoadingImage = styled.div`
  background: url(${(props) => props.backgroundUlr});
  background-size: cover;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;

const StyledLandingContainer = styled.div`
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
`;
const StyledTypeAnimation = styled.span`
  text-transform: uppercase;
  @media (min-width: 500px) {
    font-size: 1.5rem;
  }
`;

const StyledVideo = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;
const Welcome = ({ slice }) => {
  console.log(slice.primary.background_video);
  const url = `https://www.youtube.com/embed/${slice.primary.background_youtube_video.embed_url
    .match("=.*$")[0]
    .replace(
      "=",
      ""
    )}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1&loop=1`;
  return (
    <StyledLanding>
      <StyledVideo
        src={slice.primary.background_video.url}
        autoPlay
        muted
        loop
        type="video/mp4"
      />
      <StyledVideoOverlay />
      <StyledLandingContainer>
        <PrismicRichText field={slice.primary.title} />
        <StyledTypeAnimation>
          <TypeAnimation
            repeat={Infinity}
            sequence={slice.items
              .map((quote) => {
                return [prismicH.asText(quote.quote), 2000];
              })
              .flatMap((e) => e)}
          />
        </StyledTypeAnimation>
      </StyledLandingContainer>
    </StyledLanding>
  );
};

export default Welcome;
