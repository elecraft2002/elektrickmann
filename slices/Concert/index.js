import React, { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import FlatMap from "./components/FlatMap";
import * as prismicH from "@prismicio/helpers";
import { COLOR } from "../../pages/_app";

const StyledConcerts = styled.section`
  color: ${COLOR.light};
  min-height: 100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const StyledViewerContainer = styled.div`
  height: 50vh;
`;
const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const StyledList = styled.ul``;

/**
 * @typedef {import("@prismicio/client").Content.ConcertSlice} ConcertSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ConcertSlice>} ConcertProps
 * @param { ConcertProps }
 */
const Concert = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  console.log("Concert", slice);
  return (
    <StyledConcerts id="concerts">
      <span className="title">
        {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
      </span>
      <span>
        {slice.primary.description && (
          <PrismicRichText field={slice.primary.description} />
        )}
      </span>
      <StyledContainer>
        <StyledViewerContainer>
          {/* <Viewer index={activeIndex} locations={slice.items.map(location => location.concert_location)} /> */}
          <FlatMap
            index={activeIndex}
            locations={slice.items.map((location) => location.concert_location)}
          />
        </StyledViewerContainer>
        <div>
          <StyledList>
            {slice.items.map((concert) => {
              const date = prismicH.asDate(concert.concert_date);
              console.log(date);
              return (
                <li>
                  <div>
                    <p>
                      {date.getUTCDate()}.{date.getMonth()}.{date.getFullYear()}
                    </p>
                    <PrismicRichText field={concert.concert_name} />
                    {/* <button>link</button> */}
                  </div>
                </li>
              );
            })}
          </StyledList>
        </div>
      </StyledContainer>
    </StyledConcerts>
  );
};

export default Concert;
