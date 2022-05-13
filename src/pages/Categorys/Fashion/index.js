import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { Container, FooterContainer, HeaderContainer, Items} from "../../Main/style";
import { DeptHeader, InfinityBorder, ItemsContainer, SubContainer} from "../style";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import api from "../../../services/api";

export default function Fashion() {
  const [fashion, setFashion] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    handleFashion();
  }, []);

  async function handleFashion() {
    try {
      const fashionPromise = await api.getFashion([]);

      setFashion(fashionPromise.data);

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
        <DeptHeader>Moda</DeptHeader>
        <InfinityBorder />
        <SubContainer>
          <ItemsContainer isLoading={isLoading}>
            {fashion.length === 0 && isLoading && (
              <span>
                <ThreeDots color="#0377FF" height={25} width={150} />
              </span>
            )}
            {fashion.length !== 0 &&
              !isLoading &&
              Array.from(fashion).map((fashion, id) => (
                <Items
                  onClick={() => navigate(`/product/${fashion._id}`)}
                  key={id}
                >
                  <div className="image-wrapper">
                    <img
                      className="product-image"
                      src={fashion.image}
                      alt="product-img"
                    />
                  </div>
                  <div className="info-wrapper">
                    <span className="productName">{fashion.name}</span>
                    <span className="productPrice">
                      R$ {fashion.price}
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