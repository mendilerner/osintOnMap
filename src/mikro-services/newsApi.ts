
import axios from 'axios'

const newsAPIKey = '6623d98afdmsh2b706359912ea44p1c2494jsnbba2853382d4'; // Replace with your News API key




async function fetchTopNews() {
  try {
    const options = {
        method: 'GET',
        url: 'https://news-api14.p.rapidapi.com/top-headlines',
        params: {
            country: 'us',
            language: 'en',
          pageSize: '10'
        },
        headers: {
          'X-RapidAPI-Key': '6623d98afdmsh2b706359912ea44p1c2494jsnbba2853382d4',
          'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
        }
      }
      const response = await axios.request(options);
    const articles = response.data.articles.slice(0, 5); // Adjust to get a specific number of articles
    console.log('esponse: ', response);
    console.log('articles: ', articles);
    return articles.map(article => `${article.title}\n${article.url}`).join('\n\n'); // Format news headlines and URLs
  } catch (error) {
    console.error('Error fetching news:', error);
    return 'Sorry, there was an error fetching the news.';
  }
}


const a = async () => {
  const topNews = await fetchTopNews();
  console.log(topNews);
}
a()