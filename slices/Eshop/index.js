import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import { COLOR } from "../../pages/_app";
import { PrismicNextImage } from "@prismicio/next";
import Button from "../../components/Button";

const StyledSection = styled.section`
  color: ${COLOR.light};
  display: flex;
  flex-direction: column;
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
`;

const Item = (props) => {
  console.log(props);
  return (
    <StyledItemContainer>
      <fugure>
        <PrismicNextImage field={props?.product_image} />
      </fugure>
      <span>
        <PrismicRichText field={props?.product_name} />
      </span>
      <Button primary>
        <PrismicLink field={props.link_to_product}>OBJEDNAT</PrismicLink>
      </Button>
    </StyledItemContainer>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.EshopSlice} EshopSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<EshopSlice>} EshopProps
 * @param { EshopProps }
 */
const Eshop = ({ slice }) => {
  return (
    <StyledSection>
      <span>
        <PrismicRichText field={slice.primary.title} />
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
