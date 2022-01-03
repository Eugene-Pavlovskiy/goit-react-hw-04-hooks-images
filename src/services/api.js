const KEY = '23526711-d54635d6fd3abb803255ed000';
const URL = 'https://pixabay.com/api/';

function fetchImages(query, page) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('No such image'));
  });
}

const api = {
  fetchImages,
};

export default api;