import { refs } from './refs';
import axios from 'axios';

export async function pixabayApi(userText, page) {
  refs.loader.classList.add('loader');
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const API_KEY = '42305784-5d55228baaa9a6392a5b2668b';
  axios.defaults.params = {
    key: API_KEY,
    q: userText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  try {
    const { data } = await axios.get();
    refs.loader.classList.remove('loader');
    return data;
  } catch (error) {
    iziToast.error({
      position: 'topLeft',
      message: 'Sorry, there is some problem. Please try again later.',
    });
  }
}