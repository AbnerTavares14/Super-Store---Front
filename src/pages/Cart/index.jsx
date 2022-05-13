import {
    Container,
    UpperBar,
    UserEnvironment,
    SearchBar,
    SearchLogo,
    Input
} from "../../components/Header/style.js";
import Button from "../../components/Form/Button.js";
// import Container from "../../components/Form";

import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/img/Logo.png";
import api from "../../services/api";
import CartContext from "../../context/cartContext.js";

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
                                                <Quantidade>
                                                    <h5 className="quantity">{qtd}</h5>
                                                </Quantidade>
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

const FinalizePurchase = styled.button`
    margin-top: 20px;
    width: 260px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "all")};
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    background-color: #4a85c4;
    color: #fff;
    &:hover {
    filter: brightness(120%);
    }
`

const MyCart = styled.div`
    width: 450px;
    height: 190px;
    margin-bottom: 12px;
    border-radius: 5px;
    border: solid 1px #DDD;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    padding: 10px;
    img{
        width: 150px;
        height: 150px;
        margin-right: 5px;
    }
`

const ContainerItem = styled.div`
    display: flex;
    position: relative;

    ion-icon[name="trash-outline"] {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
`

const Item = styled.div`
    margin-left: 5px;
    position: relative;
    h2 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 18px;
        color: #000;
        font-weight: bold;
        margin-bottom: 5px;
    }
    p {
        font-family: "Lexend Deca", sans-serif;
        font-size: 14px;
        color: #555;
    }
    h4 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 14px;
        color: #555;
        margin-right: 5px;
        position: absolute;
        bottom: 5px;
    }
    .price {
        font-family: "Lexend Deca", sans-serif;
        font-size: 14px;
        color: #555;
        position: absolute;
        bottom: 5px;
        right: 0;
    }
    ion-icon[name="remove-circle-outline"] {
        position: absolute;
        bottom: 3px;
        left: 95px;
        cursor: pointer;
    }
    ion-icon[name="add-circle-outline"] {
        position: absolute;
        bottom: 3px;
        left: 145px;
        cursor: pointer;
    }
    span {
        display: flex;
    }
`

const PurchaseSummary = styled.aside`
    width: 300px;
    height: 400px;
    margin-left: 35px;
    margin-top: 50px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
    }
`

const InfoSummary = styled.div`
    width: 290px;
    height: 170px;
    border-radius: 5px;
    border: 1 solid #FFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    background-color: #DDDD;
    padding: 15px;
    span {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    h2 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #555;
        font-size: 17px;
    }
    h3 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #000;
        font-size: 15px;
    }
`

const Body = styled.div`
    display: flex;
    justify-content: center;
`

const Quantidade = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 3px;
    border: 1px solid #DDD;
    position: absolute;
    bottom: 0;
    left: 115px;
    .quantity {
        font-family: "Lexend Deca", sans-serif;
        font-size: 12px;
        color: #000;
    }
`

const ContainerCart = styled.section`
    display: flex;
    flex-direction: column;
    width: 480px;
    margin-left: 10px;
    padding-top: 50px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
        margin-bottom: 5px;
    }
    h3 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #666666;
        margin-bottom: 20px;
    }
`
const ContainerCartVoid = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    padding-top: 50px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
        margin-bottom: 5px;
    }
    h3 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #666666;
        margin-bottom: 20px;
    }
`


const Info = styled.div`
    padding: 10px;
    ion-icon {
        font-size: 180px;
        color: #036AA3;
        text-align: center;
    }
    
    p {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        color: #036AA3;
    }
`