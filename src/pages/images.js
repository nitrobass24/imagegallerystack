import React from "react";
import Layout from "../layouts/DefaultLayout";
import Gallery from "../components/Gallery";

const Page = () => {
  return (
    <Layout>
      <Gallery subreddit="gifs" />
    </Layout>
  );
};

export default Page;
