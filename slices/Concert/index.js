import React, { useState } from "react";
import { PrismicImage, PrismicLink, PrismicRichText } from "@prismicio/react";
import styled, { css } from "styled-components";
import FlatMap from "./components/FlatMap";
import * as prismicH from "@prismicio/helpers";
import { COLOR } from "../../pages/_app";
import Button from "../../components/Button";
import { PrismicNextImage } from "@prismicio/next";
import { Fade } from "react-reveal";

const StyledConcerts = styled.section`
  color: ${COLOR.light};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledContainer = styled.div`
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 700px) {
    gap: 4rem;
    display: flex;
    flex-direction: column-reverse;
  }
  max-width: 1200px;
  margin: 0 1rem;
`;
const StyledList = styled.ul``;
const StyledLine = styled.div`
  display: grid;
  cursor: pointer;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  transition: 0.3s;
  align-items: center;
  border-bottom: solid 1px ${COLOR.light};
  padding: 0 0.5rem;
  font-size: 1.2rem;
  @media (max-width: 400px) {
    font-size: 1rem;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
const StyledLi = styled.li``;
const StyledInfo = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  gap: 2rem;
  align-items: center;
`;
const StyledImg = styled(PrismicNextImage)`
  margin: 1rem;
`;
/**
 * @typedef {import("@prismicio/client").Content.ConcertSlice} ConcertSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ConcertSlice>} ConcertProps
 * @param { ConcertProps }
 */
const StyledArticleContainer = styled.article`
  border-radius: 4px;
  ${(props) =>
    props.active &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid ${COLOR.light};
    `}
`;

const ConcertSection = ({ setActiveIndex, activeIndex, concert, index }) => {
  const date = prismicH.asDate(concert.concert_date);
  return (
    <StyledLi>
      <StyledArticleContainer active={index == activeIndex}>
        <StyledLine
          onClick={() => {
            index == activeIndex ? setActiveIndex(null) : setActiveIndex(index);
          }}
        >
          <time dateTime={date}>
            {date.getUTCDate()}.{date.getMonth()}.{date.getFullYear()}
          </time>
          <PrismicRichText field={concert.concert_name} />
          <Button primary>
            <PrismicLink field={concert.concert_order_link}>
              OBJEDNAT
            </PrismicLink>
          </Button>
        </StyledLine>
        {index == activeIndex && (
          <StyledInfo>
            <StyledImg field={concert.concert_image} />
            <span>
              <PrismicRichText field={concert.concert_description} />
            </span>
          </StyledInfo>
        )}
      </StyledArticleContainer>
    </StyledLi>
  );
};

const Concert = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <StyledConcerts id="concerts">
      <StyledContainer>
        <StyledViewerContainer>
          {/* <Viewer index={activeIndex} locations={slice.items.map(location => location.concert_location)} /> */}
          <FlatMap
            index={activeIndex}
            locations={slice.items.map((location) => location.concert_location)}
            setActiveIndex={setActiveIndex}
          />
        </StyledViewerContainer>
        <StyledViewerContainer>
          {slice.primary.title && (
            <Fade bottom>
              {" "}
              <PrismicRichText field={slice.primary.title} />
            </Fade>
          )}
          <StyledList>
            {slice.items.map((concert, i) => {
              return (
                <ConcertSection
                  key={i}
                  setActiveIndex={setActiveIndex}
                  activeIndex={activeIndex}
                  concert={concert}
                  index={i}
                />
              );
            })}
          </StyledList>
        </StyledViewerContainer>
      </StyledContainer>
    </StyledConcerts>
  );
};

export default Concert;
