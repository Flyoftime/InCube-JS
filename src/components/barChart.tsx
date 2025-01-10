import React from "react";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type barChartProps = {
  maxTemp: number;
  minTemp: number;
  maxHumidity: number;
  minHumidity: number;
};

function barMaxMin({
  maxTemp,
  maxHumidity,
  minHumidity,
  minTemp,
}: barChartProps) {
  // Data suhu
  const data = {
    labels: ["Temperatur", "Humidity"], // Dua label saja
    datasets: [
      {
        label: "Minimum",
        data: [minTemp, minHumidity], // Data suhu minimum
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Warna bar
        borderColor: "rgba(54, 162, 235, 1)", // Warna border
        borderWidth: 1,
      },
      {
        label: "Maksimum",
        data: [maxTemp, maxHumidity], // Data suhu maksimum
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Warna bar
        borderColor: "rgba(255, 99, 132, 1)", // Warna border
        borderWidth: 1,
      },
    ],
  };

  // Opsi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Suhu dan Kelembapan Minimum Maksimum",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Mulai dari 0 pada sumbu Y
      },
    },
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <div className="lg:h-[400px] h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default barMaxMin;
