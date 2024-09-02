import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { chartDataByUser } from "../services/api"; // Adjust the import path as needed

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const BarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monthly Data",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading indicator
      try {
        const result = await chartDataByUser(); // Fetch data from API
        console.log(result); // Debug: log result to see its structure

        // Check if result is valid and non-empty
        if (
          result &&
          typeof result === "object" &&
          Object.keys(result).length > 0
        ) {
          setData({
            labels: Object.keys(result), // Set labels for the chart
            datasets: [
              {
                label: "Monthly Data",
                data: Object.values(result), // Set data points for the chart
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          // Handle case where result is empty or invalid
          setError("No data available.");
        }
      } catch (error) {
        // Handle any errors during data fetching
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once on mount

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading chart data...</div>;
  } else {
    return <div>Can't load data</div>;
  }

  if (error) {
    return <div>Error loading chart data: {error}</div>;
  }

  // Render the chart if data is available
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default BarChart;
