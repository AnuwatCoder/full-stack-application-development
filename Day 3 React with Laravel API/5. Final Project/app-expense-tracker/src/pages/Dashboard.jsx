import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BarChart from "../components/BarChart";

function Dashboard() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Dashboard Expense Tracker
          </span>
        </h1>
        <div className="grid gap-8">
          <BarChart />
        </div>
      </div>
      <Navbar />
    </section>
  );
}

export default Dashboard;
