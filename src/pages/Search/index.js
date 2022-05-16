import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { DeptHeader, InfinityBorder } from "../Categorys/style";
import { Container, FooterContainer, HeaderContainer } from "../Main/style";
import { SubContainer, BackToMainButton } from "./style";

export default function Seach() {

    const navigate = useNavigate();

    return (
        <>
            <HeaderContainer>
                <Header />
            </HeaderContainer>
            <Container>
                <InfinityBorder />
                <DeptHeader>Resultados de pesquisa</DeptHeader>
                <InfinityBorder />
                <SubContainer>
                    <span>Em Breve!</span>
                </SubContainer>
                <BackToMainButton onClick={() => navigate("/")}>
                    Voltar à página principal
                </BackToMainButton>
            </Container>
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </>
    );
}