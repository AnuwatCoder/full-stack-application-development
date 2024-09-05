import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Fetch from './Fetch';
import ProductDetail from './ProductDetail';
import NotFound from './NotFound';

function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Our Store!</h1>} />
            <Route path="/products" element={<Fetch />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
