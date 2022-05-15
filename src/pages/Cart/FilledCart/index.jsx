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
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function FillerCart(props) {
    const { name, search, setSearch, isLoading, handleSearch, products, priceTotal, cartQuantity, quantity } = props;
    const [qtd, setQtd] = useState(1);
    const navigate = useNavigate();
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
                        <h1>{products.name}</h1>
                    </UserEnvironment>
                </UpperBar>
            </Container>
            <Body>
                <ContainerCart>
                    <h1>Meu carrinho</h1>
                    {products.products[0].cart.map((product) => {
                        return (
                            <MyCart>
                                <ContainerItem>
                                    <img src={product.image} alt="" />
                                    <Item>
                                        <h2>{product.name}</h2>
                                        <p>{product.description || product.describe}</p>
                                        <span>
                                            <h4>Quantidade:</h4>
                                            <ion-icon onClick={() => setQtd(qtd - 1)} name="remove-circle-outline"></ion-icon>
                                            <Quantity>
                                                <h5 className="quantity">{product.quantity}</h5>
                                            </Quantity>
                                            <h5 className="price">Preço: {product.price}</h5>
                                            <ion-icon onClick={() => setQtd(qtd + 1)} name="add-circle-outline"></ion-icon>
                                        </span>
                                    </Item>
                                    <ion-icon name="trash-outline"></ion-icon>
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
                            <h3>R$ {priceTotal.toFixed(2)}</h3>
                        </span>
                        <span>
                            <h2>Frete</h2>
                            <h3>R$ 20,00</h3>
                        </span>
                        <span>
                            <h2>Valor total</h2>
                            <h3>R$ {(priceTotal + 20).toFixed(2)} em 1x</h3>
                        </span>
                        <FinalizePurchase>Finalizar compra</FinalizePurchase>
                    </InfoSummary>
                </PurchaseSummary>
            </Body>
        </>
    )
}