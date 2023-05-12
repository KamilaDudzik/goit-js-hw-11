const gallery = document.querySelector(".gallery");

export const renderGallery = (images) => {
    const markupGallery = images
        .map(image => {
            const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
            return `
            <a class="gallery__link" href="${largeImageURL}>
                <div class="gallery__card" id="${id}">
                    <img class="gallery__image" loading="lazy" src="${webformatURL}" alt="${tags}"  />
                    <ul class="gallery__info">
                        <li>
                            <h2>Likes</h2>
                            <p>${likes}</p>
                        </li>
                        <li>
                            <h2>Views</h2>
                            <p>${views}</p>
                        </li>
                        <li>
                            <h2>Comments</h2>
                             <p>${comments}</p>
                        </li>
                        <li>
                            <h2>Downloads</h2>
                            <p>${downloads}</p>
                        </li>
                    </ul>
                </div>
            </a>
        `
        })
        .join("");
    
    gallery.innerHTML(markupGallery);
}