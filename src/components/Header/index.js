import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Cart,
  Container,
  LowerBar,
  SearchBar,
  SearchLogo,
  UpperBar,
  UserEnvironment,
  TotalItensCart,
  DepartmentLink,}
from "./style";

import Button from "@mui/material/Button";

import Logo from "../../assets/img/Logo.png"



export default function Header() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState({text: "",});

    function handleSearch() {
        navigate("/search");
      }
    

    return (
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
                <Button onClick={() => navigate("/login")} variant="contained">
                  Entrar
                </Button>
            </UserEnvironment>
            <Cart to="/cart">
              <div><ion-icon name="cart-outline"></ion-icon></div>
              {/* TODO: mostrar a quantidade de itens que tem no carrinho */}
            </Cart>
          </UpperBar>
          <LowerBar>
            <DepartmentLink to="/games">GAMES</DepartmentLink>
            <DepartmentLink to="/health">SAÚDE E HIGIENE</DepartmentLink>
            <DepartmentLink to="/eletro">ELETRODOMÉSTICOS</DepartmentLink>
            <DepartmentLink to="/accessories">ACESSÓRIOS</DepartmentLink>
            <DepartmentLink to="/books">LIVROS</DepartmentLink>
            <DepartmentLink to="/fashion">MODA</DepartmentLink>
            <DepartmentLink to="/home">CASA</DepartmentLink>
          </LowerBar>
        </Container>
      );
}