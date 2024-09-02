import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api"; // Adjust the path as needed

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [category_id, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    onSelectCategory(category_id);
  }, [category_id, onSelectCategory]);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) return <div>Loading...</div>; // Show "Loading..." while fetching
  if (error) return <div>Error: {error}</div>; // Show error if something goes wrong

  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="category_id"
        value={category_id}
        onChange={handleChange}
        required
      >
        <option value="">--Please choose an option--</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryList;
