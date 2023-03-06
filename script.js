const subreddit = "Images";
const limit = 10;
const url = `https://www.reddit.com/r/${subreddit}/top/.json?limit=${limit}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const imageGallery = document.querySelector('.image-gallery');
    data.data.children.forEach(child => {
      const imageUrl = child.data.url;
      const imageTitle = child.data.title;
      if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = imageTitle;
        imageGallery.appendChild(img);
      }
    });
  })
  .catch(error => console.error(error));
