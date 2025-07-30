// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { refs } from './refs';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { pixabayApi } from './pixabay-api';

// let gallery = new SimpleLightbox('.gallery a', { captions: false });

// export function checkFunction(userData) {
//   if (userData.hits.length === 0) {
//     iziToast.error({
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//       position: 'topLeft',
//     });
//   } else {
//     iziToast.success({
//       message: `A total of ${userData.totalHits} images were successfully found`,
//       position: 'topLeft',
//     });

//     if (userData.totalHits > 15) {
//       refs.loadMore.classList.remove('is-hidden');
//       let page = 2;
//       const totalPages = Math.ceil(userData.totalHits / 15);
//       refs.loadMore.addEventListener('click', async () => {
//         if (page > totalPages) {
//           refs.loadMore.classList.add('is-hidden');
//           return iziToast.error({
//             position: 'topLeft',
//             message:
//               "We're sorry, but you've reached the end of search results.",
//           });
//         }
//         try {
//           const results = await pixabayApi(refs.input.value.trim(), page);
//           renderFunction(results);
//           page += 1;
//         } catch (error) {
//           iziToast.error({
//             position: 'topLeft',
//             message: 'Sorry, there is some problem. Please try again later.',
//           });
//         }
//         const height =
//           refs.gallery.firstElementChild.getBoundingClientRect().height;

//         window.scrollBy({
//           behavior: 'smooth',
//           top: height * 2,
//         });
//       });
//     }
//     renderFunction(userData);
//   }
// }

// function renderFunction(userData) {
//   const markup = userData.hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<li class="gallery-item">
//         <a href="${largeImageURL}">
//           <img src="${webformatURL}" alt="${tags}" title="${tags}"/>
//           <ul>
//             <li>
//               <h3>Likes</h3>
//               <p>${likes}</p>
//             </li>
//             <li>
//               <h3>Vievs</h3>
//               <p>${views}</p>
//             </li>
//             <li>
//               <h3>Comments</h3>
//               <p>${comments}</p>
//             </li>
//             <li>
//               <h3>Downloads</h3>
//               <p>${downloads}</p>
//             </li>
//           </ul>
//         </a></li>`;
//       }
//     )
//     .join('');
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
//   gallery.refresh();
// }


import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast'; 

let galleryLightboxInstance;

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" title="${tags}"/>
            <div class="info">
              <h3>Likes</h3>
              <p>${likes}</p>
              <h3>Views</h3>
              <p>${views}</p>
              <h3>Comments</h3>
              <p>${comments}</p>
              <h3>Downloads</h3>
              <p>${downloads}</p>
            </div>
          </a>
        </li>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  
  if (!galleryLightboxInstance) {
    galleryLightboxInstance = new SimpleLightbox('.gallery a', {
      captionsData: 'alt', 
      captionDelay: 250,
    });
  } else {
    galleryLightboxInstance.refresh();
  }
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

export function hideLoader() {
  refs.loader.classList.add('is-hidden');
}


export function showLoadMoreButton() { 
  refs.loadMore.classList.remove('is-hidden');
}

export function hideLoadMoreButton() { 
  refs.loadMore.classList.add('is-hidden');
}

export function showEndOfResultsToast() {
  iziToast.info({
    message: "Sorry, you have reached the end of the search results.",
    position: 'topRight',
  });
}