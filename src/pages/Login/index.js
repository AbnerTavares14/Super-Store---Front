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

import Swal from "sweetalert2";
import LogoContainer from "../../components/Form/LogoContainer";
import Footer from "../../components/Form/Footer";

import Logo from "../../assets/img/Logo.png"

export default function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <LogoContainer>
                <img src={Logo} alt="superstore-logo" onClick={() => navigate("/")} />
            </LogoContainer>
            <Container>
                <Title>Faça seu login</Title>
                <Form onSubmit={handleSubmit}>
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
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <ThreeDots color="#FFFFFF" height={50} width={50} />
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </Form>

                <StyledLink to="/sign-up">
                    <span>Primeira vez?</span>
                    <span>Cadastre-se!</span>
                </StyledLink>
            </Container>
            <Footer />
        </>
    );
}