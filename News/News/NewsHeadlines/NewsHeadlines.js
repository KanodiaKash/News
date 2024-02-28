const newsContainer = document.getElementById('news-container');
const loadMoreButton = document.getElementById('load-more-button');

let page = 1;

const apiKey = '047e8fa9c76047589c3e9420eb60865f';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=5`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log('Data fetched:', data);
    const articles = data.articles;
    displayArticles(articles);
    loadMoreButton.style.display = 'block';
  })
  .catch(error => console.error('Error fetching news:', error));

loadMoreButton.addEventListener('click', () => {
  page++;
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=5`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Data fetched:', data);
      const articles = data.articles;
      displayArticles(articles);
      if (articles.length < 5) {
        loadMoreButton.style.display = 'none';
      }
    })
    .catch(error => console.error('Error fetching news:', error));
});

function displayArticles(articles) {
  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-article');

    const titleElement = document.createElement('h2');
    titleElement.textContent = article.title;
    articleElement.appendChild(titleElement);

    const sourceElement = document.createElement('p');
    sourceElement.textContent = `Source: ${article.source.name}`;
    articleElement.appendChild(sourceElement);

    const dateElement = document.createElement('p');
    dateElement.textContent = `Published: ${new Date(article.publishedAt).toLocaleDateString()}`;
    articleElement.appendChild(dateElement);

    newsContainer.appendChild(articleElement);
  });
}