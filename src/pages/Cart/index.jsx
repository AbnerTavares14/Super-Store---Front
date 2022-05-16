import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import CartContext from "../../context/CartContext.js";
import FilledCart from "./FilledCart"
import VoidCart from "./VoidCart/index.jsx";


export default function Cart() {
    const { cartQuantity, setCartQuantity } = useContext(CartContext);
    const { auth, name } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [exist, setExist] = useState(false);
    const [search, setSearch] = useState({ text: "", });
    const [qtd, setQtd] = useState(0);
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
                console.log(res.data)
                setExist(true);
            })
            .catch((err) => {
                console.log("Falha ao recuperar os produtos", err);
            });
    }, []);

    function handleSearch() {
        navigate("/search");
    }



    console.log(products)
    if (exist && products) {
        tamanho = products.length;
        products.forEach((product) => {
            let price = 0;
            quantity += product.quantity;
            price = product.product.price * product.product.quantity;
            priceT += price;
        });
    }

    console.log(quantity)


    if (!exist) {
        return (
            <>
                <VoidCart search={search} setSearch={(e) => setSearch(e)} isLoading={isLoading} name={name || ""} handleSearch={() => handleSearch()} />
            </>
        )
    } else {
        return tamanho < 1 ? (
            <>
                <VoidCart search={search} setSearch={(e) => setSearch(e)} isLoading={isLoading} name={name || ""} handleSearch={() => handleSearch()} />
            </>
        )
            :
            (
                <>
                    <FilledCart search={search} auth={auth} qtd={qtd} setQtd={(number) => setQtd(number)} quantity={quantity} setSearch={(e) => setSearch(e)} isLoading={isLoading} handleSearch={() => handleSearch()} name={name} products={products} priceTotal={priceT} setCartQuantity={setCartQuantity} />
                </>
            )
    }
}


