import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://projeto--super-store.herokuapp.com";//api_heroku aqui vai ser colocada a api do heroku

function postSignIn(body) {
    const promise = axios.post(`${BASE_URL}/sign-in`, body);

    return promise;
};

function postSignUp(body) {
    const promise = axios.post(`${BASE_URL}/sign-up`, body);

    return promise;
};

function getSingleProduct(productId) {
    const promise = axios.get(`${BASE_URL}/products/${productId}`);

    return promise;
};

function postAddToCart(body, token) {
    const promise = axios.post(`${BASE_URL}/add-to-cart`, body, token);

    return promise;
}


const api = {
    postSignUp,
    getSingleProduct,
    postAddToCart,
    postSignIn
};

export default api;

