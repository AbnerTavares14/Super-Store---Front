import {
    Container,
    UpperBar,
    UserEnvironment,
    SearchBar,
    SearchLogo,
    Input
} from "../../components/Header/style.js";
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/img/Logo.png";
import api from "../../services/api";
import CartContext from "../../context/cartContext.js";
import {
    Info,
    ContainerCart,
    ContainerCartVoid,
    ContainerItem,
    MyCart,
    Quantity,
    Body,
    InfoSummary,
    PurchaseSummary,
    FinalizePurchase,
    Item
} from "./style";

export default function Cart() {
    const { cartQuantity, setCartQuantity } = useContext(CartContext);
    const { auth } = useAuth();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState({ text: "", });
    const [qtd, setQtd] = useState(1);
    const navigate = useNavigate();

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
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    console.log("Falha ao recuperar os produtos", err);
                }
            });
    }, []);

    function handleSearch() {
        navigate("/search");
    }

    let tamanho = 0;
    let priceTotal = 0;
    if (products.products) {

        tamanho = products.products.length;
        console.log(products.products[0].cart[0].description)

        products.products[0].cart.forEach((product) => {
            let price = 0;
            price = product.price * product.quantity;
            priceTotal += price;
        });
    }

    return tamanho < 1 ? (
        <>
            <Container>
                <UpperBar>
                    <img
                        src={Logo}
                        alt="superstore-logo"
                        onClick={() => navigate("/")}
                    />
                    <SearchBar>
                        <form onSubmit={handleSearch}>
                            <Input
                                type="text"
                                placeholder="O que você está buscando?"
                                name="search"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search.text}
                                disabled={isLoading}
                                required
                            />
                            <SearchLogo type="submit">
                                <ion-icon
                                    name="search-outline"
                                ></ion-icon>
                            </SearchLogo>
                        </form>
                    </SearchBar>
                    <UserEnvironment>
                        {/* TODO: caso o usuário estiver logado, aparecer infos dele, como nome e tals */}
                    </UserEnvironment>
                </UpperBar>
            </Container>
            <ContainerCartVoid>

                <Info>
                    <ion-icon name="cart-outline"></ion-icon>
                    <p>Seu carrinho está vazio</p>
                </Info>
                <h3>Adicione produtos clicando no botão "Comprar" na página de produtos.</h3>
                <Link to="/">
                    <Button>VOLTAR PARA A PÁGINA INICIAL</Button>
                </Link>
            </ContainerCartVoid>
        </>
    )
        :
        (
            <>
                <Container>
                    <UpperBar>
                        <img
                            src={Logo}
                            alt="superstore-logo"
                            onClick={() => navigate("/")}
                        />
                        <SearchBar>
                            <form onSubmit={handleSearch}>
                                <Input
                                    type="text"
                                    placeholder="O que você está buscando?"
                                    name="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search.text}
                                    disabled={isLoading}
                                    required
                                />
                                <SearchLogo type="submit">
                                    <ion-icon
                                        name="search-outline"
                                    ></ion-icon>
                                </SearchLogo>
                            </form>
                        </SearchBar>
                        <UserEnvironment>
                            <h1>{products.name}</h1>
                        </UserEnvironment>
                    </UpperBar>
                </Container>
                <Body>
                    <ContainerCart>
                        <h1>Meu carrinho</h1>
                        {products.products[0].cart.map((product) => {
                            return (
                                <MyCart>
                                    <ContainerItem>
                                        <img src={product.image} alt="" />
                                        <Item>
                                            <h2>{product.name}</h2>
                                            <p>{product.description || product.describe}</p>
                                            <span>
                                                <h4>Quantidade:</h4>
                                                <ion-icon onClick={() => setQtd(qtd - 1)} name="remove-circle-outline"></ion-icon>
                                                <Quantity>
                                                    <h5 className="quantity">{qtd}</h5>
                                                </Quantity>
                                                <h5 className="price">Preço: {product.price}</h5>
                                                <ion-icon onClick={() => setQtd(qtd + 1)} name="add-circle-outline"></ion-icon>
                                            </span>
                                        </Item>
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </ContainerItem>
                                </MyCart>
                            )
                        })}
                    </ContainerCart>
                    <PurchaseSummary>
                        <h1>Resumo da compra</h1>
                        <InfoSummary>
                            <span>
                                <h2>Subtotal({cartQuantity} item(s))</h2>
                                <h3>R$ {priceTotal.toFixed(2)}</h3>
                            </span>
                            <span>
                                <h2>Frete</h2>
                                <h3>R$ 20,00</h3>
                            </span>
                            <span>
                                <h2>Valor total</h2>
                                <h3>R$ {(priceTotal + 20).toFixed(2)} em 1x</h3>
                            </span>
                            <FinalizePurchase>Finalizar compra</FinalizePurchase>
                        </InfoSummary>
                    </PurchaseSummary>
                </Body>
            </>
        )
}

