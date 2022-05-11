import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GlobalStyle } from "./styles/style";
import { MainPage, Login, SignUp } from "./pages";
import AuthContext from "./context/authContext";

import { GlobalStyle } from "./styles/style";

export default function App() {
    const [token, setToken] = useState(null);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <AuthContext.Provider value={{ token, setToken }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    )
}
