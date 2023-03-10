import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import { COLOR } from "../../pages/_app";
import { PrismicNextImage } from "@prismicio/next";
import Button from "../../components/Button";
import { Fade } from "react-reveal";
import replaceHeading from "../../assets/functions/replaceH1";

const StyledSection = styled.section`
  color: ${COLOR.light};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledItemList = styled.ul`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 240px;
  margin: 1rem;
  align-items: center;
`;
const StledImage = styled(PrismicNextImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
`;
const StyledText = styled.span`
  font-weight: 500;
  margin:1rem;
`;
const Item = (props) => {
  return (
    <Fade>
      <StyledItemContainer>
        <fugure>
          <StledImage field={props?.product_image} />
        </fugure>
        <StyledText>
          <PrismicRichText field={props?.product_name} />
        </StyledText>
        <Button primary>
          <PrismicLink field={props.link_to_product}>OBJEDNAT</PrismicLink>
        </Button>
      </StyledItemContainer>
    </Fade>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.EshopSlice} EshopSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<EshopSlice>} EshopProps
 * @param { EshopProps }
 */
const Eshop = ({ slice }) => {
  slice = replaceHeading(slice);
  return (
    <StyledSection id={"eshop"}>
      <span>
        <Fade bottom>
          {" "}
          <PrismicRichText field={slice.primary.title} />
        </Fade>
      </span>
      <StyledItemList>
        {slice?.items?.map((item, i) => (
          <Item {...item} />
        ))}
      </StyledItemList>
    </StyledSection>
  );
};

export default Eshop;
