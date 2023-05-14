import "./sass/main.scss";

import { renderGallery } from "./js/render-gallery";
import { fetchImages } from "./js/fetch-images";

import axios from "axios";
import Notiflix from "notiflix";

import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById("search-form")
const searchQuery = document.querySelector("input[name='searchQuery']");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");

let galleryLightbox = new SimpleLightbox(".gallery a", { captions: true, captionsData: "alt", captionDelay: 250, captionPosition: "bottom" });
let page = 1;
let value = "";
let totalPage = 0;

const onSubmit = async (event) => {
  event.preventDefault();
  value = event.target.searchQuery.value.trim();
  loadMoreButton.classList.add("is-hidden");
  page = 1;
  if (!value) {
    Notiflix.Notify.failure("Please enter a keyword to search.");
    return;
  } else {
    gallery.innerHTML = "";
  }

  const data = await fetchImages(value, page);
  if (data.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
    }
    
  event.target.reset();
  loadMoreButton.classList.remove("is-hidden");
  gallery.insertAdjacentHTML("beforeend", renderGallery(data.hits));
  Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
  totalPage = Math.ceil(data.total / data.hits.length);
  galleryLightbox.refresh();
}

const loadMoreImages = async (event) => {

  event.preventDefault();
  page += 1;
  const data = await fetchImages(value, page);

  if (totalPage < page) {
    
    loadMoreButton.classList.add("is-hidden");
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
      );
      
  } else {

    gallery.insertAdjacentHTML("beforeend", renderGallery(data.hits));
    galleryLightbox.refresh();
    
    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
      top: cardHeight * 3,
      behavior: "smooth",
    })
  } 
};

searchForm.addEventListener("submit", onSubmit);
loadMoreButton.addEventListener("click", loadMoreImages);
