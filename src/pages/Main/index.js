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
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function MainPage() {
  const [books, setBooks] = useState("");
  const [games, setGames] = useState("");
  const [eletro, setEletro]= useState("");
  const [home, setHome]= useState("");

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
      const eletroPromise = await api.getEletro([]);
      const homePromise = await api.getHome([]);

      setBooks(booksPromise.data);
      setGames(gamesPromise.data);
      setEletro(eletroPromise.data);
      setHome(homePromise.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const scroll = (scrollOffset, ref) => {
    ref.current.scrollLeft += scrollOffset;
  };

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
              ref={ref1}
            >
              <HorizontalScrollButton
                right={false}
                onClick={() => scroll(-200, ref1)}
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </HorizontalScrollButton>
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
            <HorizontalScrollButton
              right={true}
              onClick={() => scroll(200, ref1)}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </HorizontalScrollButton>
          </Department>
          <Department>
            <DepHeader>GAMES</DepHeader>
            <ItemsContainer
              isLoading={isLoading}
              className="sliderContainer"
              ref={ref2}
            >
              <HorizontalScrollButton
                right={false}
                onClick={() => scroll(-200, ref2)}
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </HorizontalScrollButton>
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
            <HorizontalScrollButton
              right={true}
              onClick={() => scroll(200, ref2)}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </HorizontalScrollButton>
          </Department>
          <Department>
            <DepHeader>ELETRODOMÉSTICOS</DepHeader>
            <ItemsContainer
              isLoading={isLoading}
              className="sliderContainer"
              ref={ref3}
            >
              <HorizontalScrollButton
                right={false}
                onClick={() => scroll(-200, ref3)}
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </HorizontalScrollButton>
              {eletro.length === 0 && isLoading && (
                <span>
                  <ThreeDots color="#0377FF" height={25} width={150} />
                </span>
              )}
              {eletro.length !== 0 &&
                !isLoading &&
                Array.from(eletro).map((eletro, id) => (
                  <Items
                    onClick={() => navigate(`/product/${eletro._id}`)}
                    key={id}
                  >
                    <div className="image-wrapper">
                      <img
                        className="product-image"
                        src={eletro.image}
                        alt="ps"
                      />
                    </div>
                    <div className="info-wrapper">
                      <span className="productName">{eletro.name}</span>
                      <span className="productPrice">
                        R$ {eletro.price}
                      </span>
                    </div>
                  </Items>
                ))}
            </ItemsContainer>
            <HorizontalScrollButton
              right={true}
              onClick={() => scroll(200, ref3)}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </HorizontalScrollButton>
          </Department>
          <Department>
            <DepHeader>CASA</DepHeader>
            <ItemsContainer
              isLoading={isLoading}
              className="sliderContainer"
              ref={ref4}
            >
              <HorizontalScrollButton
                right={false}
                onClick={() => scroll(-200, ref4)}
              >
                <ion-icon name="chevron-back-outline"></ion-icon>
              </HorizontalScrollButton>
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
                        alt="ps"
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
            <HorizontalScrollButton
              right={true}
              onClick={() => scroll(200, ref4)}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </HorizontalScrollButton>
          </Department>
        </SubContainer>
      </Container>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}