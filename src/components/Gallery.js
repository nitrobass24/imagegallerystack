import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  text-align: center;
  margin: auto;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 1em 10px 3.75em 10px;
  background-color: #fef5e6;

.infinite-scroll-component {
  columns: 3;
  column-gap: 10px;
}

.insta-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  //padding: 10px;
  box-sizing: border-box;
}

.insta {
  break-inside: avoid-column; /* prevent items from breaking across columns */
  //margin-top: 100px;
  //margin-bottom: 100px;
  //margin-bottom: 18px; /* add margin to the bottom of each item to create spacing */
  box-sizing: border-box;
  box-shadow: 1px 1px 10px #444;
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 10px;
  //padding: 0; //10px 5px;
  //margin: 0 5px;
  //border: 10px solid transparent;
  //margin-right: 9px;
  //margin-left: 9px;
}

//.infinite-scroll-component {
  //display: flex;
  //flex-wrap: wrap;
  //justify-content: center;
  //align-items: flex-start; /* align to the top of the container */
//}

//.insta-img {
  //width: 100%; /* fill the width of the container */
  //height: auto; /* maintain aspect ratio */
  //object-fit: cover;
//}

//.insta {
  //width: calc((100% - 18px * 2) / 4); /* calculate the width of each column based on the number of columns you want */
  //flex-basis: calc((100% - 18px * 2) / 3 - 6px); /* fixed width + margin */
  //height: auto; /* maintain aspect ratio */
  //box-sizing: border-box;
  //box-shadow: 1px 1px 10px #444;
  //margin: 9px;
//}

  //.infinite-scroll-component {
   // display: flex;
   // flex-wrap: wrap;
   // justify-content: center;
   // align-items: center;
    //margin: auto;
    //width: auto;
    //float: left;
    //clear: both;
    //display: block;
    //display: grid;
    //grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
    //grid-gap: 1em;
    //overflow: unset !important;
  //}
  //.insta-img {
    //height: 290px;
    //width: 100%;
    //object-fit: cover;
    //width: 360px; /* Set the width to a fixed value */
    //height: auto; /* Set the height to auto to maintain aspect ratio */
    //overflow-clip-margin: content-box;
    //overflow: clip;
    //aspect-ratio: auto 360 / 300;
    //height: 300px;
  //}
  //.insta {
    //width: 100%;
    //height: 290px;
    //box-sizing: border-box;
    //box-shadow: 1px 1px 10px #444;
    //float: left;
    //display: flex;
    //height: 300px;
    //width: 360px;
    //text-align: center;
    //min-width: 200px;
    //margin: 9px;
  //}
  span {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    margin-top: 3em;
  }
  @media only screen and (max-width: 1035px) {
    padding-left: 10px;
  }
`;

const Page = ({ subreddit }) => {
  const [images, setImages] = useState([]);
  const [after, setAfter] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    const url = `https://api.reddit.com/r/${subreddit}/new.json?limit=15&after=${after}`;
    await fetch(url)
      .then((response) => response.json())
      .then(async (result) => {
        let imageUrls = result.data.children
          .filter((child) => child.data.post_hint === "image")
          .map((child) => child.data.url);

        if (imageUrls.length < 15) {
          await fetch(
            `https://api.reddit.com/r/${subreddit}/new.json?limit=15&after=${result.data.after}`
          )
            .then((resp) => resp.json())
            .then((res) => {
              const arr = res.data.children
                .filter((child) => child.data.post_hint === "image")
                .map((child) => child.data.url);
              imageUrls = imageUrls.concat(arr);
            });
        }

        if (imageUrls.length > 15) {
          imageUrls = imageUrls.slice(0, 15);
        }

        const arr = images.concat(imageUrls);
        setAfter(result.data.after);
        setImages(arr);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore
        loader={<span>Loading ...</span>}
      >
        {images.map((node) => (
          <a
            href={node}
            target="_blank"
            rel="noopener noreferrer"
            key={node}
            className="insta"
          >
            <img src={node} alt="instagram" className="insta-img" />
          </a>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Page;
