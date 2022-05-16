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
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import LogoContainer from "../../components/Form/LogoContainer";
import Logo from "../../assets/img/Logo.png";
import Footer from "../../components/Form/Footer";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { auth, login, setName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    const promise = api.postSignIn({ ...loginData });
    promise
      .then((response) => {
        setIsLoading(false);

        login(response.data.token);
        setName(response.data.name);

        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error)

        if (error.response.status === 422) {
          setLoginData({
            email: "",
            password: "",
          });
          return Swal.fire({
            icon: "error",
            title: "Falha no login!",
            text: "A senha deve ter no mínimo 6 caracteres e o e-mail deve ser válido.",
          });
        }

        if (error.response.status === 401) {
          setLoginData({
            email: "",
            password: "",
          });
          return Swal.fire({
            icon: "error",
            title: "Falha no login!",
            text: "E-mail e/ou senha incorretos.",
          });
        }
      });
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
