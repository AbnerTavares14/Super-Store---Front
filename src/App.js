import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/style";
import {MainPage, Login, SignUp} from "./pages";


export default function App() {

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
