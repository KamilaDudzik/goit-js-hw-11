export function renderGallery(response) {
  return response
    .map(
        ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
            return `
            <a class="gallery__link" href="${largeImageURL}">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="gallery__info">
                        <p class="gallery__item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="gallery__item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="gallery__item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="gallery__item">
                            <b>Downloads</b>
                        ${downloads}
                        </p>
                    </div>
            </a>
            `;
      }
    )
    .join("");
}