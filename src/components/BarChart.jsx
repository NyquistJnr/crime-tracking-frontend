import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reports/stats/grouped-monthly`,
          config
        );

        // Transform the API data into the format Chart.js needs
        const transformedData = processDataForChart(response.data.data);
        setChartData(transformedData);
      } catch (error) {
        console.error("Failed to fetch bar chart data:", error);
      }
    };

    if (user?.token) {
      fetchChartData();
    }
  }, [user]);

  if (!chartData) {
    return (
      <div style={{ textAlign: "center", color: "#888" }}>
        Loading chart data...
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#FFFFFF" } },
      title: { display: false },
    },
    scales: {
      y: { ticks: { color: "#CCCCCC" }, grid: { color: "#444444" } },
      x: { ticks: { color: "#CCCCCC" }, grid: { color: "#444444" } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

// --- Data Transformation Helper Function ---
const processDataForChart = (apiData) => {
  const labels = apiData.map((d) => d.month);

  // Find all unique crime types across all months
  const crimeTypes = [
    ...new Set(
      apiData.flatMap((month) => month.counts.map((c) => c.crimeType))
    ),
  ];

  const backgroundColors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
  ];

  const datasets = crimeTypes.map((type, index) => {
    return {
      label: type,
      data: apiData.map((monthData) => {
        const crime = monthData.counts.find((c) => c.crimeType === type);
        return crime ? crime.count : 0; // Return count or 0 if crime type not present in that month
      }),
      backgroundColor: backgroundColors[index % backgroundColors.length],
    };
  });

  return {
    labels,
    datasets,
  };
};

export default BarChart;
