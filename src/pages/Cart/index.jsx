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

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import styled from "styled-components";
import Logo from "../../assets/img/Logo.png"
import axios from "axios";
import api from "../../services/api";


export default function Cart() {
    const { auth } = useContext(AuthContext);
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
        const promise = api.getCart(config);
        promise.then((response) => {
            setProducts(response.data);
            console.log(response.data);
        });
        promise.catch((err) => {
            console.log("Falha ao recuperar os produtos", err);
        });
    }, []);

    function handleSearch() {
        navigate("/search");
    }
    let tamanho = 0;
    if (products.products) {
        tamanho = products.products.length;
    }

    return (
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
                    <MyCart>
                        <ContainerItem>
                            <img src="https://sapatinhodeluxo.vteximg.com.br/arquivos/ids/177446-620-620/8020.01_1-Tenis-Lona-Preto-Vulcanizado-Flat-0.jpg?v=637756853198930000" alt="" />
                            <Item>
                                <h2>Tênis All Star infantil</h2>
                                <p>Descrição: Tênis muito foda e confortável</p>
                                <span>
                                    <h4>Quantidade:</h4>
                                    <ion-icon onClick={() => setQtd(qtd - 1)} name="remove-circle-outline"></ion-icon>
                                    <Quantidade>
                                        <h5>{qtd}</h5>
                                    </Quantidade>
                                    <ion-icon onClick={() => setQtd(qtd + 1)} name="add-circle-outline"></ion-icon>
                                </span>
                            </Item>
                            <ion-icon name="trash-outline"></ion-icon>
                        </ContainerItem>
                    </MyCart>
                </ContainerCart>
                <PurchaseSummary>
                    <h1>Resumo da compra</h1>
                    <InfoSummary>
                        <span>
                            <h2>Subtotal(1 item)</h2>
                            <h3>R$ 40,50</h3>
                        </span>
                        <span>
                            <h2>Frete</h2>
                            <h3>R$ 20,00</h3>
                        </span>
                        <span>
                            <h2>Valor total</h2>
                            <h3>R$ 60,50 em 1x</h3>
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

    h5 {
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



{/* <Container>
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
<ContainerCart>
<Info>
    <ion-icon name="cart-outline"></ion-icon>
    <p>Seu carrinho está vazio</p>
</Info>
<h3>Adicione produtos clicando no botão "Comprar" na página de produtos.</h3>
<Button>VOLTAR PARA A PÁGINA INICIAL</Button>
</ContainerCart>
</> */}