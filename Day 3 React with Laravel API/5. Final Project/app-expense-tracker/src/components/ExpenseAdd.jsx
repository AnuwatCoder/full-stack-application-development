import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import { createExpense } from "../services/api";

function ExpenseAdd({ onSuccess = () => {} }) {
  const [category_id, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!date) {
      setError("Please select a date.");
      setIsSubmitting(false);
      return;
    }

    if (!category_id) {
      setError("Please select a category.");
      setIsSubmitting(false);
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedDate = date?.startDate || "";
      await createExpense(category_id, amount, description, formattedDate);
      setSuccess("Create Expense Successful!");
      if (onSuccess) onSuccess(); // Notify parent component
      navigate("/expense");
    } catch (error) {
      console.error("Create Expense Error:", error); // Log full error for debugging
      const errorMessage =
        error.response?.data?.message ||
        "Create Expense failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4">
          <label
            htmlFor="expense"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Expense
          </label>
          <input
            type="text"
            id="expense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Expense"
            required
          />
        </div>
        <div className="p-4">
          <label
            htmlFor="categorylist"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category List
          </label>
          <CategoryList onSelectCategory={handleCategorySelect} />
        </div>
        <div className="p-4">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0.00"
            required
          />
        </div>
        <div className="p-4">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Date
          </label>
          <Datepicker
            id="date"
            useRange={false}
            asSingle={true}
            value={date}
            onChange={(newDate) => setDate(newDate)}
            required
          />
        </div>
      </div>
      <div className="p-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`text-green-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:text-white"
          } border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2`}
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseAdd;
