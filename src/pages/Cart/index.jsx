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
import AuthContext from "../../context/AuthContext";
import styled from "styled-components";
import Logo from "../../assets/img/Logo.png"
import cart from "../../assets/img/carrinho.png"
import axios from "axios";


export default function Cart() {
    const { token } = useContext(AuthContext);
    const { produtos, setProdutos } = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState({ text: "", });
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get("https://projeto--super-store.herokuapp.com/cart", config);
        promise.then((resposta) => {
            setProdutos(resposta.data);
        });
        promise.catch((err) => {
            console.log("Falha ao recuperar os produtos", err);
        });
    }, []);

    function handleSearch() {
        navigate("/search");
    }
    let tamanho = produtos.products.length;

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
            <ContainerCart>

                <Info>
                    <ion-icon name="cart-outline"></ion-icon>
                    <p>Seu carrinho está vazio</p>
                </Info>
                <h3>Adicione produtos clicando no botão "Comprar" na página de produtos.</h3>
                <Button>VOLTAR PARA A PÁGINA INICIAL</Button>
            </ContainerCart>
        </>
    )
        :
        (
            <h1>Tem produtos</h1>
        )
}

const ContainerCart = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
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