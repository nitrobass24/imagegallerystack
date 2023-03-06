module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-reddit",
      options: {
        subreddit: "Images",
        limit: 10
      }
    }
  ]
};
