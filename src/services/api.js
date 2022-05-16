import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://projeto--super-store.herokuapp.com";

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

function getGames() {
  const promise = axios.get(`${BASE_URL}/games`);

  return promise;
}

function getHealth() {
  const promise = axios.get(`${BASE_URL}/health`);

  return promise;
}

function getEletro() {
  const promise = axios.get(`${BASE_URL}/eletro`);

  return promise;
}

function getAccessories() {
  const promise = axios.get(`${BASE_URL}/accessories`);

  return promise;
}

function getBooks() {
  const promise = axios.get(`${BASE_URL}/books`);

  return promise;
}

function getFashion() {
  const promise = axios.get(`${BASE_URL}/fashion`);

  return promise;
}

function getHome() {
  const promise = axios.get(`${BASE_URL}/home`);

  return promise;
}

function getProductOfCart(token) {
  const promise = axios.get(`${BASE_URL}/cart`, token);

  return promise;
}


function setBuy(body, token) {
  console.log(body);
  const promise = axios.post(`${BASE_URL}/purchases`, body, token);
}
  


function deleteItemFromCart(productId, token) {
  const promise = axios.delete(`${BASE_URL}/delete-cart-item/${productId}`, token);


  return promise;
}


function getPurchase(token) {
  const promise = axios.post(`${BASE_URL}/purchases`, token);

  return promise;
}


function deleteCart(token) {
  const promise = axios.delete(`${BASE_URL}/cart`, token);

  return promise;
}


const api = {
  postSignIn,
  postSignUp,
  getSingleProduct,
  postAddToCart,
  getGames,
  getHealth,
  getEletro,
  getAccessories,
  getFashion,
  getBooks,
  getHome,
  getProductOfCart,
  setBuy,
  getPurchase,
  deleteCart,
  deleteItemFromCart
};

export default api;