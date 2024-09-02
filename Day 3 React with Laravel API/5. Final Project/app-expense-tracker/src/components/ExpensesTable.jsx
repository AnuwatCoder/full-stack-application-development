import React, { useState, useEffect } from "react";
import { fetchByUserId } from "../services/api"; // Update the path to where fetchExpenses is defined

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const data = await fetchByUserId();
        console.log("Fetched expenses:", data); // Log the fetched data
        setExpenses(data);
      } catch (err) {
        console.error(err); // Log the full error object
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getExpenses();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Expense
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{expense.description}</td>
                <td className="px-6 py-4">{expense.amount}</td>
                <td className="px-6 py-4">{expense.categoryName}</td>{" "}
                {/* Adjust according to your API response structure */}
                <td className="px-6 py-4">
                  {expense.date
                    ? new Date(expense.date).toLocaleDateString()
                    : "N/A"}
                </td>
                {/* Format the date as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpensesTable;
