import { BrowserRouter , Route, Routes } from "react-router-dom";

//load header
import { Header } from "../components/Header.jsx";

//load pages
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";



const RoutesManager = ()  => {
    return (
        <BrowserRouter>
        
            <Header />

            <Route path="/" element={<Home />} />
            //Todo add other paths

        </BrowserRouter>
    )
}

export default RoutesManager;