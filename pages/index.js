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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const StyledSliceContainer = styled.div`
  background: url(${stratches.src});
`;

const Index = ({ navigation, settings, page }) => {
  console.log(page);
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
      <StyledSliceContainer>
        <SliceZone slices={page.data.slices} components={components} />
      </StyledSliceContainer>
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

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}
