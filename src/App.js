import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GlobalStyle } from "./styles/style";
import { MainPage, Login, SignUp, SingleProduct} from "./pages";
import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";


export default function App() {
    const [token, setToken] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
            <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
                <AuthContext.Provider value={{ token, setToken }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/product/:productId" element={<SingleProduct />} />
                    </Routes>
                </AuthContext.Provider>
                </CartContext.Provider>
            </BrowserRouter>
        </>
    )
}
