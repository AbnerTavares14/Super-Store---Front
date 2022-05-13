import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { Container, FooterContainer, HeaderContainer, Items} from "../../Main/style";
import { DeptHeader, InfinityBorder, ItemsContainer, SubContainer} from "../style";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import api from "../../../services/api";

export default function Home() {
  const [home, setHome] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    handleHome();
  }, []);

  async function handleHome() {
    try {
      const homePromise = await api.getHome([]);

      setHome(homePromise.data);

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
        <DeptHeader>Casa</DeptHeader>
        <InfinityBorder />
        <SubContainer>
          <ItemsContainer isLoading={isLoading}>
            {home.length === 0 && isLoading && (
              <span>
                <ThreeDots color="#0377FF" height={25} width={150} />
              </span>
            )}
            {home.length !== 0 &&
              !isLoading &&
              Array.from(home).map((home, id) => (
                <Items
                  onClick={() => navigate(`/product/${home._id}`)}
                  key={id}
                >
                  <div className="image-wrapper">
                    <img
                      className="product-image"
                      src={home.image}
                      alt="product-img"
                    />
                  </div>
                  <div className="info-wrapper">
                    <span className="productName">{home.name}</span>
                    <span className="productPrice">
                      R$ {home.price}
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