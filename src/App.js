import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GlobalStyle } from "./styles/style";
import { MainPage, Login, SignUp, SingleProduct, Cart, Receipt } from "./pages";
import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import Games from "./pages/Categorys/Games";
import Health from "./pages/Categorys/Health";
import Eletro from "./pages/Categorys/Eletro";
import Accessories from "./pages/Categorys/Accessories";
import Books from "./pages/Categorys/Books";
import Fashion from "./pages/Categorys/Fashion";
import Home from "./pages/Categorys/Home";


export default function App() {
    const [auth, login] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [name, setName] = useState(null);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
                    <AuthContext.Provider value={{ auth, login, name, setName }}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/product/:productId" element={<SingleProduct />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/games" element={<Games />} />
                            <Route path="/health" element={<Health />} />
                            <Route path="/eletro" element={<Eletro />} />
                            <Route path="/accessories" element={<Accessories />} />
                            <Route path="/books" element={<Books />} />
                            <Route path="/fashion" element={<Fashion />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/receipt" element={<Receipt />} />
                        </Routes>
                    </AuthContext.Provider>
                </CartContext.Provider>
            </BrowserRouter>
        </>
    )
}
