import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import styled from "styled-components";
import { PrismicNextImage } from "@prismicio/next";
import { COLOR } from "../pages/_app";
const StyledLi = styled.li`
  display: flex;
`;
const StyledLink = styled(PrismicLink)`
  margin: 1rem;
  display: flex;
  align-items: center;
  height: 2rem;
  aspect-ratio: 1;
`;
const StyledImage = styled(PrismicNextImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledFooter = styled.footer`
  background: #171717;
  color: ${COLOR.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
`;
const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
export const Footer = ({ settings }) => {
  return (
    <StyledFooter>
      <StyledList>
        {settings.data.socials.map((social, i) => {
          return (
            <StyledLi key={i}>
              <StyledLink field={social.social_link}>
                <StyledImage field={social.social_img} />
              </StyledLink>
            </StyledLi>
          );
        })}
      </StyledList>
      <a
        href="https://www.vojtechsuchanek.cz/cs-cz"
        rel="noreferrer"
        target="_blank"
      >
        Vojtík Suchánek 2023
      </a>
    </StyledFooter>
  );
};
