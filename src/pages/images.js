import React from "react";
import Layout from "../layouts/DefaultLayout";
import Gallery from "../components/Gallery";

const Page = () => {
  return (
    <Layout>
      <Gallery subreddit="collegesluts" />
    </Layout>
  );
};

export default Page;
