import React, { useState, useEffect } from "react";
import { fetchByUserId, deleteExpenseById } from "../services/api";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ExpenseAdd from "../components/ExpenseAdd";
import Loader from "../components/Loader";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getExpenses = async () => {
    try {
      const data = await fetchByUserId();
      if (Array.isArray(data)) {
        setExpenses(data);
      } else if (data.data && Array.isArray(data.data)) {
        setExpenses(data.data);
      } else {
        setExpenses([]);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.message || "An unexpected error occurred.");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExpenseById(id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
      setError("Failed to delete expense. Please try again later.");
    }
  };

  const handleExpenseAdded = () => {
    getExpenses(); // Refetch expenses when a new expense is added
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="bg-white dark:bg-gray-900">
      <Header />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Expense List
          </span>
        </h1>

        <div className="relative">
          <div className="w-full mb-5">
            <ExpenseAdd onSuccess={handleExpenseAdded} />
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expense
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      {expense.date
                        ? formatDate(
                            new Date(expense.date).toLocaleDateString()
                          )
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">{expense.description}</td>
                    <td className="px-6 py-4">{expense.amount}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="px-3 py-2 text-xs font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Navbar />
    </section>
  );
};

export default Expense;
