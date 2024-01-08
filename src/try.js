const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news/trendingtopics',
  params: {
    textFormat: 'Raw',
    safeSearch: 'Off'
  },
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '6623d98afdmsh2b706359912ea44p1c2494jsnbba2853382d4',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
};

const a  = async () => {try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}}
a()