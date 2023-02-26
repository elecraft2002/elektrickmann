import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import { COLOR } from "../../pages/_app";
import { PrismicNextImage } from "@prismicio/next";
import Button from "../../components/Button";

const StyledSection = styled.section`
  color: ${COLOR.light};
`;

const Item = (props) => {
  console.log(props);
  return (
    <div>
      <PrismicNextImage field={props?.product_image} />
      <span>
        <PrismicRichText field={props?.product_name} />
      </span>
      <Button primary>
        <PrismicLink field={props.link_to_product}>OBJEDNAT</PrismicLink>
      </Button>
    </div>
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
      <div>
        {slice?.items?.map((item, i) => (
          <Item {...item} />
        ))}
      </div>
    </StyledSection>
  );
};

export default Eshop;
