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
    ContainerCart,
    ContainerItem,
    MyCart,
    Quantity,
    Body,
    InfoSummary,
    PurchaseSummary,
    FinalizePurchase,
    Item
} from "../style";
import useAuth from "../../../hooks/useAuth";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/Form/Button";


export default function FilledCart(props) {
    const { name, search, setSearch, isLoading, handleSearch, products, priceTotal, cartQuantity, quantity, qtd, setQtd } = props;
    const navigate = useNavigate();
    const [priceT, setPriceTotal] = useState(priceTotal);
    const { auth } = useAuth();

    function increaseQuantity(price) {
        setQtd(qtd + 1);
        setPriceTotal(price + priceTotal);
    }

    function decreaseQuantity(price) {
        setQtd(qtd - 1);
        setPriceTotal((priceTotal - price));
    }

    function removeItem(productId) {
        api
          .deleteItemFromCart(productId, {
            headers: { Authorization: `Bearer ${auth}` },
          })
          .then(window.location.reload());
    }

    console.log(products)
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
            <Body>
                <ContainerCart>
                    <h1>Meu carrinho</h1>
                    {products.map((product) => {
                        return (
                            <MyCart>
                                <ContainerItem>
                                    <img src={product.product.image} alt="" />
                                    <Item>
                                        <h2>{product.product.name}</h2>
                                        <p>{product.product.description || product.product.describe}</p>
                                        <span>
                                            <h4>Quantidade:</h4>
                                            <ion-icon onClick={() => decreaseQuantity(product.product.price)} name="remove-circle-outline"></ion-icon>
                                            <Quantity>
                                                <h5 className="quantity">{product.product.quantity + qtd}</h5>
                                            </Quantity>
                                            <h5 className="price">Preço: {product.product.price}</h5>
                                            <ion-icon onClick={() => increaseQuantity(product.product.price)} name="add-circle-outline"></ion-icon>
                                        </span>
                                    </Item>
                                    <ion-icon name="trash-outline" onClick={()=> removeItem(product._id)}></ion-icon>
                                </ContainerItem>
                            </MyCart>
                        )
                    })}
                </ContainerCart>
                <PurchaseSummary>
                    <h1>Resumo da compra</h1>
                    <InfoSummary>
                        <span>
                            <h2>Subtotal({quantity} item(s))</h2>
                            <h3>R$ {priceT}</h3>
                        </span>
                        <span>
                            <h2>Frete</h2>
                            <h3>R$ 20,00</h3>
                        </span>
                        <span>
                            <h2>Valor total</h2>
                            <h3>R$ {(priceT + 20)} em 1x</h3>
                        </span>
                        <FinalizePurchase>Finalizar compra</FinalizePurchase>
                    </InfoSummary>
                </PurchaseSummary>
            </Body>
        </>
    )
}