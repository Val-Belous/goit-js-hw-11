// import Notiflix from 'notiflix';
import axios from 'axios';

export default async function fetchGallery(value, page) {
  return await axios({
    url: 'https://pixabay.com/api/',
    params: {
      key: '28350308-94cf9f8b9e1d3a4f8bcec6d50',
      q: value,
      image_type: 'photo',
      oriesafesearchntation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 40,
    },
  });
}

// const baseUrl = 'https://pixabay.com/api/';
// const KEY = '?key=28350308-94cf9f8b9e1d3a4f8bcec6d50';
// const filter = '&image_type=photo&orientation=horizontal&safesearch=true';

// const response = fetch(`${baseUrl}${KEY}&q=${value}${filter}`)
//   .then(data => {
//     //   console.log(data);
//     if (!data.ok) {
//       // console.log(data);
//       throw new Error(error);
//     }
//     //   console.log(data.json());
//     return data.json();
//   })
//   .catch(() =>
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     )
//   );
// return response;
