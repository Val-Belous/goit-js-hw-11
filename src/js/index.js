import fetchGallery from './fetch_gallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const box = document.querySelector('.gallery');

form.addEventListener('submit', handlerForm);

function handlerForm(evt) {
  evt.preventDefault();
  //   console.log(evt.target.elements.searchQuery.value);
  const inputName = evt.target.elements.searchQuery.value;
  fetchGallery(inputName).then(response => {
    createMarkUp(response.hits);
  });
}

// function createMarkUp(lol) {
//   const test = lol
//     .map(elem => {
//       `<div class="photo-card">
//   <a href="${elem.largeImageURL}"><img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" /></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${elem.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${elem.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${elem.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${elem.downloads}</b>
//     </p>
//   </div>
// </div>`;
//     })
//     .join('');

//   box.insertAdjacentHTML('afterbegin', test);
//   console.log(lol);
// }

function createMarkUp(images) {
  const listOfPhotos = images
    .map(image => {
      return `<div class="photo-card">
  <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>  
  </div>
</div>`;
    })
    .join('');
  box.insertAdjacentHTML('afterbegin', listOfPhotos);
  const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
}
