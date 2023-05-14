import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36354038-aa1773e88ccb2b59a1c57888b';
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: KEY,
    per_page: 40,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  }
});  

export const fetchImages = async (valueInput, page) => {
  try {
    const { data } = await api.get("", {
      params: { page: page, q: valueInput },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};