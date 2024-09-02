// src/App.js
import React from "react";
import Navbar from "./layouts/Navbar";
import BottomNav from "./layouts/BottomNav";
import Footer from "./layouts/Footer";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 p-4">
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>
      <br/>
      <div
        className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </div>
    </main>
    <Footer />
    <BottomNav />
  </div>
);

export default App;
