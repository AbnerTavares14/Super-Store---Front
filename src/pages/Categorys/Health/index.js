import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { Container, FooterContainer, HeaderContainer, Items} from "../../Main/style";
import { DeptHeader, InfinityBorder, ItemsContainer, SubContainer} from "../style";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import api from "../../../services/api";

export default function Health() {
    const [health, setHealth] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      setLoading(true);
      handleHealth();
    }, []);
  
    async function handleHealth() {
      try {
        const healthPromise = await api.getHealth([]);
  
        setHealth(healthPromise.data);
  
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  
    return (
      <>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Container>
          <InfinityBorder />
          <DeptHeader>Saúde e Higiene</DeptHeader>
          <InfinityBorder />
          <SubContainer>
            <ItemsContainer isLoading={isLoading}>
              {health.length === 0 && isLoading && (
                <span>
                  <ThreeDots color="#0377FF" height={25} width={150} />
                </span>
              )}
              {health.length !== 0 &&
                !isLoading &&
                Array.from(health).map((health, id) => (
                  <Items
                    onClick={() => navigate(`/product/${health._id}`)}
                    key={id}
                  >
                    <div className="image-wrapper">
                      <img
                        className="product-image"
                        src={health.image}
                        alt="product-img"
                      />
                    </div>
                    <div className="info-wrapper">
                      <span className="productName">{health.name}</span>
                      <span className="productPrice">
                        R$ {health.price}
                      </span>
                    </div>
                  </Items>
                ))}
            </ItemsContainer>
          </SubContainer>
        </Container>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  }