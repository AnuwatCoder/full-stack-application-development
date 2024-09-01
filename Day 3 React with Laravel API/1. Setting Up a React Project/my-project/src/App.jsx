import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Silebar from './layouts/Sidebar'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Header />
      <Silebar />
      <Home />
      <Footer />
    </>
  );
}

export default App
