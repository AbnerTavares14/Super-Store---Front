import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MainPage, Login, SignUp, SingleProduct } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import CartContext from "./context/CartContext"

import { GlobalStyle } from "./styles/style";

export default function App() {
    const [cartQuantity, setCartQuantity] = useState(0);

    return (
        <AuthProvider>
            <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/product/:productId" element={<SingleProduct />} />
                    </Routes>
                </BrowserRouter>
            </CartContext.Provider>
        </AuthProvider>
    )
}
