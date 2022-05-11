import {
    Container,
    Form,
    Input,
    Button,
    StyledLink,
    Title,
} from "../../components/Form";

import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoContainer from "../../components/Form/LogoContainer";
import Footer from "../../components/Form/Footer";
import styled from "styled-components";
import Logo from "../../assets/img/Logo.png"
import axios from "axios";

export default function SignUp() {
    const [loginData, setLoginData] = useState({ email: "", password: "", name: "", repeat_password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const promise = axios.post("https://projeto--super-store.herokuapp.com/sign-up", {
            name: loginData.name,
            email: loginData.email,
            password: loginData.password,
            repeat_password: loginData.repeat_password
        });
        promise.then(() => {
            navigate("/login");
        });
        promise.catch((err) => {
            console.error("Deu ruim!", err);
            setLoginData({ email: "", password: "", name: "", repeat_password: "" });
        });
    }

    return (
        <>
            <LogoContainer>
                <img src={Logo} alt="superstore-logo" onClick={() => navigate("/")} />
            </LogoContainer>
            <Container>
                <Title>Faça seu cadastro</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Nome"
                        name="name"
                        onChange={handleChange}
                        value={loginData.name}
                        disabled={isLoading}
                        required
                    ></Input>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        onChange={handleChange}
                        value={loginData.email}
                        disabled={isLoading}
                        required
                    ></Input>
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        onChange={handleChange}
                        value={loginData.password}
                        disabled={isLoading}
                        required
                    ></Input>
                    <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        name="repeat_password"
                        onChange={handleChange}
                        value={loginData.repeat_password}
                        disabled={isLoading}
                        required
                    ></Input>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <ThreeDots color="#FFFFFF" height={50} width={50} />
                        ) : (
                            "Cadastrar"
                        )}
                    </Button>
                </Form>

                <StyledLink to="/login">
                    <span>Já possui uma conta?</span>
                    <span>Fazer login</span>
                </StyledLink>
            </Container>
            <Footer />
        </>
    );
}

// const Footer = styled.footer`
//     width: 100%;
//     height: 40px;
//     position: fixed;
//     bottom: 0;
//     background-color: #005AA3;
// `