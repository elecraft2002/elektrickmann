import Head from "next/head";
import {
  PrismicLink,
  PrismicRichText,
  PrismicText,
  SliceZone,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { components } from "../slices";
import styled from "styled-components";
import stratches from "../assets/imgs/scratches.jpg";
import { useEffect, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const StyledSliceContainer = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${stratches.src});
  background-size: contain;
  background-repeat: repeat-y;
`;

const BackgroundParralax = (props) => {
  const [offset, setOffset] = useState(0);
  const handleScroll = () => {
    setOffset(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledSliceContainer style={{ backgroundPositionY: offset / 4 }}>
      {props.children}
    </StyledSliceContainer>
  );
};

const Index = ({ navigation, settings, page }) => {
  console.log(settings);
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
        <link
          rel="icon"
          type="image/x-icon"
          href={settings.data.profilePicture.Icon.url}
        ></link>
      </Head>
      <BackgroundParralax>
        <SliceZone slices={page.data.slices} components={components} />
      </BackgroundParralax>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  // const articles = await client.getAllByType("article", {
  //   orderings: [
  //     { field: "my.article.publishDate", direction: "desc" },
  //     { field: "document.first_publication_date", direction: "desc" },
  //   ],
  // });

  const page = await client.getByUID("page", "landing");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  // const response = await fetch(`${process.env.BASE_FETCH_URL}/api/eshop`);
  // const data = await response.json();
  // console.log("Data: ", data);
  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}
