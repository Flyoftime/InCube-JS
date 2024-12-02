'use client'
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';
import { getDatabase, ref, onValue } from "firebase/database";
import app from "@/lib/firebase/init"; // Firebase initialization

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Legend, Title
);

function Chart() {
    const [temperatureData, setTemperatureData] = useState<number[]>([]);
    const [humidityData, setHumidityData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        const db = getDatabase(app);
        const tempRef = ref(db, 'data/temperature');
        const humidityRef = ref(db, 'data/humidity');

        // Fetch real-time temperature data
        const unsubscribeTemp = onValue(tempRef, (snapshot) => {
            const newTemperature = snapshot.val();
            console.log('New temperature:', newTemperature);

            const now = new Date();
            const currentHour = now.getHours().toString().padStart(2, '0');
            const currentMinute = now.getMinutes().toString().padStart(2, '0');
            const currentSecond = now.getSeconds().toString().padStart(2, '0');

            setTemperatureData((prevData) => {
                const updatedData = [...prevData, newTemperature];
                return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
            });

            setLabels((prevLabels) => {
                const newLabel = `${currentHour}:${currentMinute}:${currentSecond}`;
                const updatedLabels = [...prevLabels, newLabel];
                return updatedLabels.length > 60 ? updatedLabels.slice(1) : updatedLabels;
            });
        });

        // Fetch real-time humidity data
        const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
            const newHumidity = snapshot.val();
            console.log('New humidity:', newHumidity);

            setHumidityData((prevData) => {
                const updatedData = [...prevData, newHumidity];
                return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
            });
        });

        // Cleanup listeners
        return () => {
            unsubscribeTemp();
            unsubscribeHumidity();
        };
    }, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Incubator Temperature (°C)',
                data: temperatureData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Real-time Incubator Temperature and Humidity'
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
            x: {
                title: {
                    display: true,
                    text: 'Time (HH:MM:SS)',
                },
            }
        }
    };

    return (
        <div className=" h-[442px]">
            <Line data={chartData} options={options as any} />
        </div>
    );
}

export default Chart;
