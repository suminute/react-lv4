import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFoundPage from "../components/common/NotFoundPage";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Router = () => {
  const token = sessionStorage.getItem("accessToken");
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        {!token && <Route path='/login' element={<Login />} />}
        {!token && <Route path='/signup' element={<SignUp />} />}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
