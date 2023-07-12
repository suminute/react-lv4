import React from "react";
import Header from "../components/common/Header";
import Main from "../components/Main";
import Footer from "../components/common/Footer";
import { auth } from "../firebase";

const Home = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Home;
