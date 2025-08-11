import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((d) => d.crimeType),
    datasets: [
      {
        label: "# of Reports",
        data: chartData.map((d) => d.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          // You can make borders transparent for a cleaner look
          "#1E1E1E",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for custom sizing
    cutout: "60%", // This creates the doughnut hole. Adjust percentage for thickness.
    plugins: {
      legend: {
        position: "right", // Move legend to the side
        labels: {
          color: "#FFFFFF",
          boxWidth: 20,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
