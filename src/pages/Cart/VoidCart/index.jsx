import { Link, useNavigate } from "react-router-dom"

import {
    Container,
    UpperBar,
    UserEnvironment,
    SearchBar,
    SearchLogo,
    Input
} from "../../../components/Header/style.js";
import Logo from "../../../assets/img/Logo.png";
import {
    ContainerCartVoid,
    Info
} from "../style";
import Button from "../../../components/Form/Button";

export default function VoidCart(props) {
    const navigate = useNavigate();
    const { name, search, setSearch, isLoading, handleSearch } = props;
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
                        {name ? (
                            `Olá, ${name}`
                        ) : (
                            <Button onClick={() => navigate("/login")} variant="contained">
                                Entrar
                            </Button>
                        )}
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
}