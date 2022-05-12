import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GlobalStyle } from "./styles/style";
import { MainPage, Login, SignUp, SingleProduct, Cart } from "./pages";
import CartContext from "./context/cartContext";
import AuthContext from "./context/authContext";


export default function App() {
    const [auth, login] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
                    <AuthContext.Provider value={{ auth, login }}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/product/:productId" element={<SingleProduct />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </AuthContext.Provider>
                </CartContext.Provider>
            </BrowserRouter>
        </>
    )
}
