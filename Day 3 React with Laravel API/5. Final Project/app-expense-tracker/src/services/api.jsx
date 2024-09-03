import axios from "axios";

const API_URL = "http://localhost:8000/api/";

// Helper function to get the auth token from localStorage
const getAuthToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

export const register = async (name, email, password, confirmPassword) => {
  const response = await axios.post(`${API_URL}register`, {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

// Login an existing user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });

    const { token, user } = response.data;
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
    return user;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Logout the current user
export const logout = () => {
  localStorage.removeItem("user");
};

// Get the current logged-in user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user:", error.message);
    return null;
  }
};

// Example of an API call with token
export const fetchProtectedData = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Fetch protected data error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to fetch category data from the API
export const fetchCategories = async () => {
  try {
    const token = getAuthToken(); // Retrieve the token from localStorage

    // Make an API request to fetch category data
    const response = await axios.get(`${API_URL}category`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    return response.data; // Return the data from the response
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error after logging it
  }
};

/**
 * Creates a new expense.
 */
export const createExpense = async (category_id, amount, description, date) => {
  try {
    const token = getAuthToken();
    const user = getCurrentUser();
    const user_id = user ? user.id : null;
    const response = await axios.post(
      `${API_URL}expense`,
      { category_id, amount, description, date, user_id },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(
      "Create expense error:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error after logging it
  }
};

// Fetch expenses function
export const fetchByUserId = async () => {
  try {
    const token = getAuthToken(); // Retrieve the token from localStorage
    const user = getCurrentUser();
    const user_id = user ? user.id : null;

    // Ensure user_id is valid before making the request
    if (!user_id) {
      throw new Error("User ID is required to fetch expenses");
    }

    const response = await axios.get(`${API_URL}fetchByUserId/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    handleError(error); // Handle and log any errors
    // Optionally rethrow or return a default value
    return []; // Return an empty array or handle as needed
  }
};

// Fetch chartDataByUser function
export const chartDataByUser = async () => {
  try {
    const token = getAuthToken(); // Retrieve the token from localStorage
    const user = getCurrentUser();
    const user_id = user ? user.id : null;

    // Ensure user_id is valid before making the request
    if (!user_id) {
      throw new Error("User ID is required to fetch expenses");
    }

    const response = await axios.get(`${API_URL}chartDataByUser/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Return the data from the response
    console.log(response.data);
  } catch (error) {
    handleError(error); // Handle and log any errors
    // Optionally rethrow or return a default value
    return []; // Return an empty array or handle as needed
  }
};

export const deleteExpenseById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}expense/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(
      "Delete expense error:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error after logging it
  }
};
