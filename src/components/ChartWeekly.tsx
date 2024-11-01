'use client'
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';
import { getDatabase, ref, onValue } from "firebase/database";
import app from "@/lib/firebase/init";

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Legend, Title
);

function ChartWeekly() {
    const [dailyTemperatureData, setDailyTemperatureData] = useState<number[]>([]);
    const [dailyHumidityData, setDailyHumidityData] = useState<number[]>([]);
    const [weeklyTemperatureData, setWeeklyTemperatureData] = useState<number[]>([]);
    const [weeklyHumidityData, setWeeklyHumidityData] = useState<number[]>([]);
    const [dayLabels, setDayLabels] = useState<string[]>([]);
    const [weekLabels, setWeekLabels] = useState<string[]>([]);

    useEffect(() => {
        const db = getDatabase(app);
        const tempRef = ref(db, 'data/temperature');
        const humidityRef = ref(db, 'data/humidity');

        let temperatureValues: number[] = [];
        let humidityValues: number[] = [];
        let dayTemperatureSum = 0;
        let dayHumiditySum = 0;
        let dayCount = 0;

        const unsubscribeTemp = onValue(tempRef, (snapshot) => {
            const newTemperature = snapshot.val();
            temperatureValues.push(newTemperature);
            dayTemperatureSum += newTemperature;
            dayCount++;

            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

            // Update daily data
            if (dayCount === 24) { // assuming 24 readings per day for hourly data
                const dailyAvgTemp = dayTemperatureSum / dayCount;
                setDailyTemperatureData((prev) => [...prev, dailyAvgTemp]);
                setDayLabels((prev) => [...prev, formattedDate]);
                dayTemperatureSum = 0;
                dayCount = 0;
            }

            // Update weekly data
            if (temperatureValues.length >= 7) {
                const weeklyAvgTemp = temperatureValues.reduce((sum, value) => sum + value, 0) / temperatureValues.length;
                setWeeklyTemperatureData((prev) => [...prev, weeklyAvgTemp]);
                setWeekLabels((prev) => [...prev, `Week of ${formattedDate}`]);
                temperatureValues = [];
            }
        });

        const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
            const newHumidity = snapshot.val();
            humidityValues.push(newHumidity);
            dayHumiditySum += newHumidity;

            if (dayCount === 24) { // assuming 24 readings per day for hourly data
                const dailyAvgHumidity = dayHumiditySum / dayCount;
                setDailyHumidityData((prev) => [...prev, dailyAvgHumidity]);
                dayHumiditySum = 0;
            }

            if (humidityValues.length >= 7) {
                const weeklyAvgHumidity = humidityValues.reduce((sum, value) => sum + value, 0) / humidityValues.length;
                setWeeklyHumidityData((prev) => [...prev, weeklyAvgHumidity]);
                humidityValues = [];
            }
        });

        return () => {
            unsubscribeTemp();
            unsubscribeHumidity();
        };
    }, []);

    const chartData = {
        labels: weekLabels,
        datasets: [
            {
                label: 'Average Weekly Temperature (°C)',
                data: weeklyTemperatureData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Average Weekly Humidity (%)',
                data: weeklyHumidityData,
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
                text: 'Weekly Average Incubator Temperature and Humidity'
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
                    text: 'Week',
                },
            }
        }
    };

    return (
        <div className="h-[442px]">
            <Line data={chartData} options={options} />
            {/* <div className="mt-8">
                <h2>Daily Average Data</h2>
                <p>Temperature (°C): {dailyTemperatureData.join(', ')}</p>
                <p>Humidity (%): {dailyHumidityData.join(', ')}</p>
            </div> */}
        </div>
    );
}

export default ChartWeekly;
