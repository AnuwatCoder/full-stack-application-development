// src/components/BottomNav.js
import React from "react";

const BottomNav = () => (
  <nav className="bg-blue-500 text-white p-4 md:hidden fixed bottom-0 w-full">
    <div className="container mx-auto flex justify-around">
      <a href="#" className="hover:underline">
        Home
      </a>
      <a href="#" className="hover:underline">
        Search
      </a>
      <a href="#" className="hover:underline">
        Profile
      </a>
      <a href="#" className="hover:underline">
        More
      </a>
    </div>
  </nav>
);

export default BottomNav;
