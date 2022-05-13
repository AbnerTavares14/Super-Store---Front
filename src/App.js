import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GlobalStyle } from "./styles/style";
import { MainPage, Login, SignUp, SingleProduct} from "./pages";
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
    const [token, setToken] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
            <AuthContext.Provider value={{ token, setToken }}>
            <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/product/:productId" element={<SingleProduct />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/health" element={<Health />} />
                        <Route path="/eletro" element={<Eletro />} />
                        <Route path="/accessories" element={<Accessories />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/fashion" element={<Fashion />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </CartContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    )
}
