
import { refs } from "./refs";
import { pixabayApi } from "./pixabay-api";
import { checkFunction } from "./render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


export function onFormSubmit(event) {
    event.preventDefault();
    refs.loadMore.classList.add("is-hidden");
    refs.gallery.innerHTML = "";
    const userText = refs.input.value.trim();
    if (userText !== "") {
        pixabayApi(userText,1).then(checkFunction);
    } else {
        iziToast.error({
            message: "Sorry, the search bar is empty. Please try again!",
            position: "topLeft",
        });
    };
}
