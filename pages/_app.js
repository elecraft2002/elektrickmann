import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "../prismicio";
import { Heading } from "../components/Heading";

import "../styles/globals.css";
import styled from "styled-components";
// import "../assets/font/HauntAOE.ttf"
import "./index.css";
const StyledHeading1 = styled.h1`
  font-size: 2rem;
  text-align: center;
  font-family: HauntAOE;
  @media (min-width: 500px) {
    font-size: 4rem;
  }
  @media (min-width: 1000px) {
    font-size: 6rem;
  }
`;
const StyledHeading2 = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-family: HauntAOE;
  @media (min-width: 500px) {
    font-size: 4rem;
  }
  @media (min-width: 1000px) {
    font-size: 6rem;
  }
`;
const richTextComponents = {
  heading1: ({ children }) => <StyledHeading1>{children}</StyledHeading1>,
  heading2: ({ children }) => (
    <StyledHeading2 >
      {children}
    </StyledHeading2>

  ),
  heading3: ({ children }) => (
    <Heading as="h4" size="xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => <StyledHeading1>{children}</StyledHeading1>,
  paragraph: ({ children }) => <p>{children}</p>,
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicLink>
  ),
};

export const Button = styled.button``;
export const COLOR = {
  dark: "black",
  light: "white",
};
export default function App({ Component, pageProps }) {
  return (
    <PrismicProvider
      internalLinkComponent={(props) => <Link {...props} />}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}
