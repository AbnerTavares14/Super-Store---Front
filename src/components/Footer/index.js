import { useNavigate } from "react-router-dom";
import { Container, LogoContainer } from "./style";

import Logo from "../../assets/img/Logo.png"

export default function Footer() {

    const navigate = useNavigate();

    return (
        <Container>
            <LogoContainer>
                <img src={Logo} alt="superstore-logo" onClick={() => navigate("/")} />
            </LogoContainer>
        </Container>
    );
}