import {
    Container,
    Department,
    DepHeader,
    FooterContainer,
    HeaderContainer,
    HorizontalScrollButton,
    Items,
    ItemsContainer,
    SubContainer,
  } from "./style";
  
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function Main(){

    const [health, setHealth]=useState("");
    const [games, setGames]=useState("");
    //Produtos que vão aparecer na tela principal

    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();
    window.scroll(0, 0);

    useEffect(() => {
        setLoading(true);
        handleProducts();
      }, []);

    async function handleProducts(){
        setLoading(true);
    try{
        //TODO: serão requisitados os produtos e armazenados no array;
        setLoading(false);
    }
    catch{
        setLoading(false);
    }
    }

    return (
        <>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <Container>
            <SubContainer>
              <Department>
                <DepHeader>SAÚDE E HIGIENE</DepHeader>
                <ItemsContainer>
                    teste produto 1 higiene
                    {/*FIXME: PRODUTOS AQUI*/}                  
                </ItemsContainer>
                
              </Department>
              <Department>
                <DepHeader>GAMES</DepHeader>
                <ItemsContainer>
                    teste produto 2 games
                    {/*FIXME: PRODUTOS AQUI*/} 
                </ItemsContainer>
              </Department>
            </SubContainer>
          </Container>
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </>
      );
}