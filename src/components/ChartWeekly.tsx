"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
} from "chart.js";
// import { getDatabase, ref, onValue } from "firebase/database";
// import app from "@/lib/firebase/init"; // Firebase initialization

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title
);

type DoubleChartProps = {
  temperatureData: number[];
  humidityData: number[];
  gasData: number[];
  labels: string[];
  limitData: number;
  Type: string;
};

function Chart({
  temperatureData,
  humidityData,
  gasData,
  labels,
  Type,
  limitData,
}: DoubleChartProps) {
  const lastTemperatureData = temperatureData.slice(-{ limitData });
  const lastHumidityData = humidityData.slice(-{ limitData });
  const lastGasData = gasData.slice(-{ limitData });
  const lastLabels = labels.slice(-{ limitData });
  const chartData = {
    labels: lastLabels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: lastTemperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Humidity (%)",
        data: lastHumidityData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Gas (ppm)",
        data: gasData,
        borderColor: "rgb(182, 99, 255)",
        backgroundColor: "rgba(45, 3, 79, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: Type,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Value",
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
      x: {
        title: {
          display: true,
          text: "Time (HH:MM:SS)",
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row lg:w-full w-4/5">
      {/* Temperature Chart */}
      <div className="lg:h-[400px] h-[300px] lg:w-full w-[240px]">
        <Line data={chartData} options={options as any} />
      </div>
    </div>
  );
}

export default Chart;
