import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { Container, FooterContainer, HeaderContainer, Items} from "../../Main/style";
import { DeptHeader, InfinityBorder, ItemsContainer, SubContainer} from "../style";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import api from "../../../services/api";

export default function Accessories() {
  const [accessory, setAccessory] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    handleAccessory();
  }, []);

  async function handleAccessory() {
    try {
      const accessoryPromise = await api.getAccessories([]);

      setAccessory(accessoryPromise.data);

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
        <DeptHeader>Acessórios</DeptHeader>
        <InfinityBorder />
        <SubContainer>
          <ItemsContainer isLoading={isLoading}>
            {accessory.length === 0 && isLoading && (
              <span>
                <ThreeDots color="#0377FF" height={25} width={150} />
              </span>
            )}
            {accessory.length !== 0 &&
              !isLoading &&
              Array.from(accessory).map((accessory, id) => (
                <Items
                  onClick={() => navigate(`/product/${accessory._id}`)}
                  key={id}
                >
                  <div className="image-wrapper">
                    <img className="product-image"
                      src={accessory.image}
                      alt="product-img"
                    />
                  </div>
                  <div className="info-wrapper">
                    <span className="productName">{accessory.name}</span>
                    <span className="productPrice">
                      R$ {accessory.price}
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