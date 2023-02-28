import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import styled from "styled-components";
import stratches from "../../assets/imgs/scratches.jpg";
import { useState } from "react";

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

const Page = ({ navigation, settings, page }) => {
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

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });
  const page = await client.getByUID("page", params.uid);
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const articles = await client.getAllByType("page");
  return {
    paths: articles.map((article) => "/page" + prismicH.asLink(article)),
    fallback: false,
  };
}
