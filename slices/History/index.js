import React from "react";
import { PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import { COLOR } from "../../pages/_app";

const StyledSection = styled.section`
  color: ${COLOR.light};
  display: flex;
  flex-direction: column;
`;
/**
 * @typedef {import("@prismicio/client").Content.HistorySlice} HistorySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HistorySlice>} HistoryProps
 * @param { HistoryProps }
 */
const History = ({ slice }) => (
  <StyledSection>
    <span className="title">
      {slice.primary.title && <PrismicRichText field={slice.primary.title} />}
    </span>
    <div>
      
    </div>
  </StyledSection>
);

export default History;
