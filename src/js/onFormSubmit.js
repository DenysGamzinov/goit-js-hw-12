import { refs } from "./refs";
import { getImagesByQuery } from "./pixabay-api";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    showEndOfResultsToast,
} from "./render-functions";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentSearchQuery = '';
let totalAvailablePages = 0;
const IMAGES_PER_PAGE = 15;

export async function onFormSubmit(event) {
    event.preventDefault();

    const userInput = refs.input.value.trim();

    if (userInput === '') {
        iziToast.error({
            message: 'Please enter something to search for images!',
            position: 'topRight',
        });
        return;
    }

    currentSearchQuery = userInput;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentSearchQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.info({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        }

        totalAvailablePages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
        createGallery(data.hits);

        if (currentPage < totalAvailablePages) {
            showLoadMoreButton();
        } else {
            showEndOfResultsToast();
        }

    } catch (error) {
        console.error('Error during image search:', error);
        iziToast.error({
            message: 'Unfortunately, there was an error loading images. Please try again later!',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
}

refs.loadMore.addEventListener('click', async () => {
    currentPage += 1;

    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentSearchQuery, currentPage);
        createGallery(data.hits);

        const galleryItemHeight = refs.gallery.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({
            behavior: 'smooth',
            top: galleryItemHeight * 2,
        });

        if (currentPage === totalAvailablePages) {
            showEndOfResultsToast();
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
        }

    } catch (error) {
        console.error('Error loading additional images:', error);
        iziToast.error({
            message: 'Sorry, there was an error loading more images. Please try again later.',
            position: 'topRight',
        });
        hideLoadMoreButton();
    } finally {
        hideLoader();
    }
});