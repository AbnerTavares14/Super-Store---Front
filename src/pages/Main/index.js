import {
  Container,
  Department,
  DepHeader,
  FooterContainer,
  HeaderContainer,
  Items,
  ItemsContainer,
  SubContainer,
} from "./style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function MainPage() {
  const [books, setBooks] = useState("");
  const [games, setGames] = useState("");

  const [isLoading, setLoading] = useState(false);


  const navigate = useNavigate();
  window.scroll(0, 0);

  useEffect(() => {
    setLoading(true);
    handleProducts();
  }, []);

  async function handleProducts() {
    setLoading(true);
    try {
      const booksPromise = await api.getBooks([]);
      const gamesPromise = await api.getGames([]);

      setBooks(booksPromise.data);
      setGames(gamesPromise.data);

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
        <SubContainer>
          <Department>
            <DepHeader>LIVROS</DepHeader>
            <ItemsContainer
              isLoading={isLoading}
              className="sliderContainer"
            >
              {books.length === 0 && isLoading && (
                <span>
                  <ThreeDots color="#0377FF" height={25} width={150} />
                </span>
              )}
              {books.length !== 0 &&
                !isLoading &&
                Array.from(books).map((book, id) => (
                  <Items
                    onClick={() => navigate(`/product/${book._id}`)}
                    key={id}
                  >
                    <div className="image-wrapper">
                      <img
                        className="product-image"
                        src={book.image}
                        alt="ps"
                      />
                    </div>
                    <div className="info-wrapper">
                      <span className="productName">{book.name}</span>
                      <span className="productPrice">
                        R$ {book.price}
                      </span>
                    </div>
                  </Items>
                ))}
            </ItemsContainer>
          </Department>
          <Department>
            <DepHeader>GAMES</DepHeader>
            <ItemsContainer
              isLoading={isLoading}
              className="sliderContainer"
            >
              {games.length === 0 && isLoading && (
                <span>
                  <ThreeDots color="#0377FF" height={25} width={150} />
                </span>
              )}
              {games.length !== 0 &&
                !isLoading &&
                Array.from(games).map((game, id) => (
                  <Items
                    onClick={() => navigate(`/product/${game._id}`)}
                    key={id}
                  >
                    <div className="image-wrapper">
                      <img
                        className="product-image"
                        src={game.image}
                        alt="ps"
                      />
                    </div>
                    <div className="info-wrapper">
                      <span className="productName">{game.name}</span>
                      <span className="productPrice">
                        R$ {game.price}
                      </span>
                    </div>
                  </Items>
                ))}
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