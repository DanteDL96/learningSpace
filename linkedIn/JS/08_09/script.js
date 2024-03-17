createArticle();
createFigure();
//  MAIN FUNCTION
function createArticle(FIGURE) {
  const ARTICLE = document.createElement('article');

  let articleObject = {
    class: 'art',
    h1: 'article 1',
    content: 'This is an article',
    img: 'img',
  };

  let figure = createFigure();

  let innerArtHTML = `<div>
  <h1>${articleObject.h1}</h1>
  <p>${articleObject.content}</p>
  </div>
  <div>${figure.outerHTML}</div>
  `;

  ARTICLE.setAttribute('class', articleObject.class);
  const finalArticle = (ARTICLE.innerHTML = innerArtHTML);
  console.log(ARTICLE);

  return finalArticle;
}

// SECOND FUNCTION
function createFigure(FIGURE, FIGCAPTION, IMG) {
  // create html objects
  FIGURE = document.createElement('figure');
  FIGCAPTION = document.createElement('figcaption');

  const IMGProperties = {
    class: 'image',
    path: './sample.png',
    caption: 'this is a caption lol',
  };

  IMG = `<img class="${IMGProperties.class}" src="${IMGProperties.path}">`;

  const caption = IMGProperties.caption;

  FIGCAPTION.innerText = caption;

  //   const innerFigure = IMG + caption;
  //   FIGURE.innerHTML = innerFigure;
  FIGURE.innerHTML = IMG + caption;
  //   console.log(FIGURE);

  //   finalArticle = FIGURE;
  return FIGURE;
}
