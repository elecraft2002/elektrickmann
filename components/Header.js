import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import { Heading } from "./Heading";
import styled from "styled-components";
import { COLOR } from "../pages/_app";
import { useEffect, useState } from "react";
import buttonImg from "../assets/imgs/E.png";
const StyledNav = styled.nav`
  display: flex;
  background: ${COLOR.dark};
  color: ${COLOR.light};
  position: fixed;
  z-index: 9999;
  height: 80px;
  width: 100vw;
  justify-content: center;
  font-family: HauntAOE;
  font-size: 2rem;
`;
const StyledNavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledList = styled.ul`
  display: flex;
  height: 100%;
`;

const StyledLink = styled(PrismicLink)`
  padding: 1rem;
  display: flex;
  align-items: center;
  height: 100%;
`;
const StyledImage = styled(PrismicNextImage)`
  width: 100%;
  height: 100%;
  max-height: 48px;
  object-fit: contain;
`;
const StyledFigure = styled.figure`
  height: 100%;
  padding: 0;
`;
const StyledLi = styled.li`
  display: flex;
`;

//Mobile
const StyledVisibleUi = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const StyledMobileNavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${COLOR.dark};
`;
const StyledMobileList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${COLOR.dark};
`;
const StyledMobileSocialsList = styled.ul`
  display: flex;
  justify-content: center;
  height: 100%;
  background: ${COLOR.dark};
  max-height: 80px;
`;
const StyledHamburgerFigure = styled.figure`
  height: 100%;
`;
const StyledButton = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: 0.5s;
  transform: rotate(
    ${(props) => {
      return props.isOpen ? "90deg" : "0deg";
    }}
  );
`;
const StyledMobileAnimationContainer = styled.div`
  transform: translateY(
    ${(props) => {
      return props.isOpen ? "0px" : "-100%";
    }}
  );
  z-index: -1;
  transition: 0.5s;
  width: 100vw;
`;
const StyledInvisibleButton = styled.div`
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
`;
export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
}) => {
  const [width, setWidth] = useState(0);
  const [isOpen, setOpenState] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (width > 900)
    return (
      <header>
        <StyledNav>
          <StyledNavContainer>
            <StyledLink href={"/"}>
              <StyledFigure>
                <StyledImage field={settings.data.profilePicture} />
              </StyledFigure>
            </StyledLink>
            <StyledList>
              {navigation.data.links.map((link, i) => {
                return (
                  <StyledLi key={i}>
                    <StyledLink href={prismicH.asText(link.link)}>
                      <PrismicRichText field={link.label} />
                    </StyledLink>
                  </StyledLi>
                );
              })}
            </StyledList>
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
          </StyledNavContainer>
        </StyledNav>
      </header>
    );
  return (
    <header>
      <StyledNav>
        <StyledMobileNavContainer>
          <StyledVisibleUi>
            <StyledLink href={"/"}>
              <StyledFigure>
                <StyledImage field={settings.data.profilePicture} />
              </StyledFigure>
            </StyledLink>
            <StyledHamburgerFigure>
              <StyledButton
                isOpen={isOpen}
                onClick={() => setOpenState(!isOpen)}
                {...buttonImg}
              />
            </StyledHamburgerFigure>
          </StyledVisibleUi>
          <StyledMobileAnimationContainer isOpen={isOpen}>
            <StyledMobileList>
              {navigation.data.links.map((link, i) => {
                return (
                  <StyledLi key={i}>
                    <StyledLink href={prismicH.asText(link.link)}>
                      <PrismicRichText field={link.label} />
                    </StyledLink>
                  </StyledLi>
                );
              })}
            </StyledMobileList>
            <StyledMobileSocialsList>
              {settings.data.socials.map((social, i) => {
                return (
                  <StyledLi key={i}>
                    <StyledLink field={social.social_link}>
                      <StyledImage field={social.social_img} />
                    </StyledLink>
                  </StyledLi>
                );
              })}
            </StyledMobileSocialsList>
          </StyledMobileAnimationContainer>
        </StyledMobileNavContainer>
        {isOpen && (
          <StyledInvisibleButton
            onClick={() => setOpenState(false)}
          ></StyledInvisibleButton>
        )}
      </StyledNav>
    </header>
  );
};
