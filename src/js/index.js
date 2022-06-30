import fetchGallery from './fetch_gallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const box = document.querySelector('.gallery');

let inputName = '';
let page = 1;

const observer = new IntersectionObserver((entries, observer) => {
  console.log(entries);
  entries.forEach(
    entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        page += 1;
        fetchGallery(inputName, page).then(response => {
          console.log(response.data.totalHits);
          createMarkUp(response.data.hits);
          if (response.data.totalHits < page * 40) {
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            return;
          }
          observer.observe(document.querySelector('.photo-card:last-child'));
        });
      }
    },
    {
      threshold: 0.5,
    }
  );
});

form.addEventListener('submit', handlerForm);

function handlerForm(evt) {
  evt.preventDefault();
  box.innerHTML = '';
  page = 1;
  inputName = evt.target.elements.searchQuery.value;
  if (inputName === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  fetchGallery(inputName, page).then(response => {
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    console.log(response.data);
    createMarkUp(response.data.hits);
    observer.observe(document.querySelector('.photo-card:last-child'));
  });
}

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
  box.insertAdjacentHTML('beforeend', listOfPhotos);
  const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
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
