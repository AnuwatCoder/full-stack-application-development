// src/components/Navbar.js
import React from "react";

const Navbar = () => (
  <nav className="bg-blue-500 text-white p-4 hidden md:flex">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-lg font-semibold">
        Brand
      </a>
      <div className="space-x-4">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Services
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
