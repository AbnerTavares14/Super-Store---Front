import Logo from "../../assets/img/Logo.png";
import {
    Container,
    UpperBar,
    UserEnvironment,
    SearchBar,
    SearchLogo,
    Input
} from "../../components/Header/style.js";
import Button from "../../components/Form/Button";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import api from "../../services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Receipt() {
    const [receipt, setReceipt] = useState([]);
    const { name, auth } = useAuth();
    const [exist, setExist] = useState(false);
    const arrString = [];
    const navigation = useNavigate();
    const navigate = useLocation();
    const [search, setSearch] = useState({ text: "", });
    const { userName, products, frete, total_price } = navigate.state;
    console.log(navigate)
    let str;

    // useEffect(() => {
    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${auth}`
    //         }
    //     }
    //     api
    //         .getPurchase(config)
    //         .then((response) => {
    //             setReceipt(response.data);
    //         })
    //         .catch((err) => {
    //             console.log("Erro ao recuperar os produtos comprados", err);
    //         });
    // }, []);

    function handleSearch() {
        navigation("/search");
    }

    return (
        <>
            <Container>
                <UpperBar>
                    <img
                        src={Logo}
                        alt="superstore-logo"
                        onClick={() => navigation("/")}
                    />
                    <SearchBar>
                        <form onSubmit={handleSearch}>
                            <Input
                                type="text"
                                placeholder="O que você está buscando?"
                                name="search"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search.text}
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
                        {
                            `Olá, ${name}`
                        }
                    </UserEnvironment>
                </UpperBar>
            </Container>
            <ContainerReceipt>
                <h1>Muito obrigado pela compra, volte sempre :D</h1>
                <ProductPurchased>
                    <p>Nome: {userName}</p>
                    <p>Itens comprados: {products.map((product) => {
                        console.log(product)
                        return (
                            <span>{product.product.name} (x{product.product.quantity}),  </span>
                        )
                    })}</p>
                    <p>Valor pago: R$ {total_price}</p>
                    <p>Frete: R$ {frete}</p>
                </ProductPurchased>
            </ContainerReceipt>
        </>
    )
}

const ContainerReceipt = styled.main`
    height:  100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    h1 {
        font-family: "Lexend Deca", sans-serif;
        font-size: 40px;
        margin-bottom: 3px;
        color: #036AA3;
    }
`

const ProductPurchased = styled.div` 
    margin-top: 50px;
    padding-right: 10px;
    p {
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        margin-bottom: 3px;
        color: #000000;
    }

`