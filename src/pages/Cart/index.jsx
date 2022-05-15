import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import CartContext from "../../context/CartContext.js";
import FilledCart from "./FilledCart"
import VoidCart from "./VoidCart/index.jsx";


export default function Cart() {
    const { cartQuantity, setCartQuantity } = useContext(CartContext);
    const { auth } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [exist, setExist] = useState(false);
    const [search, setSearch] = useState({ text: "", });
    // const [priceTotal, setPriceTotal] = useState(0);
    const navigate = useNavigate();
    let tamanho = 0;
    let priceT = 0;
    let quantity = 0;

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        }
        console.log(auth);
        api
            .getProductOfCart(config)
            .then((res) => {
                setProducts(res.data);
                console.log(res.data, products)
                setExist(true);
                // calculaPreco(res.data);
            })
            .catch((err) => {
                console.log("Falha ao recuperar os produtos", err);
            });
    }, []);

    function handleSearch() {
        navigate("/search");
    }

    if (exist) {
        tamanho = products.length;
        if (products.cart) {

            products.cart.forEach((product) => {
                let price = 0;
                quantity += product.quantity;
                price = product.price * product.quantity;
                priceT += price;
            });
        } else {
            products[0].cart.forEach((product) => {
                let price = 0;
                quantity += product.quantity;
                price = product.price * product.quantity;
                priceT += price;
            })
        }
    }


    if (!exist) {
        return (
            <>
                <VoidCart search={search} setSearch={(e) => setSearch(e)} isLoading={isLoading} name={products.name || ""} handleSearch={() => handleSearch()} />
            </>
        )
    } else {
        return tamanho < 1 || products.hasOwnProperty("cart") ? (
            <>
                <VoidCart search={search} setSearch={(e) => setSearch(e)} isLoading={isLoading} name={products.name || ""} handleSearch={() => handleSearch()} />
            </>
        )
            :
            (
                <>
                    <FilledCart search={search} quantity={quantity} setSearch={(e) => setSearch(e)} isLoading={isLoading} handleSearch={() => handleSearch()} name={products.name} products={products.hasOwnProperty('cart') ? products : products[0]} priceTotal={priceT} cartQuantity={cartQuantity} />
                </>
            )
    }
}


