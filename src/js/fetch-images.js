import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const key = "36354038-aa1773e88ccb2b59a1c57888b";

export const fetchImages = async () => {
    const response = await axios.get(
        `?key=${key}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    return response;
}