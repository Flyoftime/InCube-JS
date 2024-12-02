'use client'
import React, { useState, useEffect } from 'react'
import Paho from 'paho-mqtt'
import ChartWeekly from './ChartWeekly';
import Chart from './Chart';

type ClientType = {
    subscribe: (topic: string) => void;
    on: (event: string, callback: (message: any) => void) => void;
}

const Reports = () => {
    const [temp, setTemp] = useState<number | null>(null);
    const [humid, setHumid] = useState<number | null>(null);
    const [tempData, setTempData] = useState<number[]>(() => {

        const savedData = localStorage.getItem('tempData');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [humidData, setHumidData] = useState<number[]>(() => {

        const savedData = localStorage.getItem('humidData');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [weeklyTempAvg, setWeeklyTempAvg] = useState<number | null>(null);
    const [weeklyHumidAvg, setWeeklyHumidAvg] = useState<number | null>(null);
    const [client, setClient] = useState<ClientType | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [openAll, setOpenAll] = useState(false);

    const connectToMqttBroker = async () => {
        const clientID = "clientID-tes-mirsabanwar-mqtt";
        const host = "broker.hivemq.com";
        const port = 8000;

        const mqttClient: any = new Paho.Client(host, Number(port), clientID);

        mqttClient.onMessageArrived = messageArrived;

        mqttClient.onConnectionLost = (responseObject: any) => {
            if (responseObject.errorCode !== 0) {
                setIsConnected(false);
            }
        };

        mqttClient.connect({
            onSuccess: () => {
                setClient(mqttClient);
                setIsConnected(true);
            },
            onFailure: (message: any) => {
                setIsConnected(false);
            }
        });
    };

    const messageArrived = (message: any) => {
        const payload = parseFloat(message.payloadString);
        const topic = message.destinationName;

        if (topic === 'MirsabAnwar/Temp') {
            setTemp(payload);
            setTempData((prevData) => {
                const newData = [...prevData, payload].slice(-7); // Menyimpan data harian untuk 7 hari
                localStorage.setItem('tempData', JSON.stringify(newData)); // Simpan di localStorage
                return newData;
            });
        } else if (topic === 'MirsabAnwar/Humid') {
            setHumid(payload);
            setHumidData((prevData) => {
                const newData = [...prevData, payload].slice(-7);
                localStorage.setItem('humidData', JSON.stringify(newData)); // Simpan di localStorage
                return newData;
            });
        }
    };

    const subscribeToTopic = (topic: string) => {
        if (client && isConnected && topic) {
            client.subscribe(topic);
        }
    };

    useEffect(() => {
        if (!isConnected) {
            connectToMqttBroker();
        }
    }, [isConnected]);

    useEffect(() => {
        if (client && isConnected) {
            subscribeToTopic('MirsabAnwar/Temp');
            subscribeToTopic('MirsabAnwar/Humid');
        }
    }, [client, isConnected]);

    // Menghitung rata-rata mingguan setiap kali data diperbarui
    useEffect(() => {
        if (tempData.length === 7) {
            const tempAvg = tempData.reduce((acc, curr) => acc + curr, 0) / tempData.length;
            setWeeklyTempAvg(tempAvg);
        }
        if (humidData.length === 7) {
            const humidAvg = humidData.reduce((acc, curr) => acc + curr, 0) / humidData.length;
            setWeeklyHumidAvg(humidAvg);
        }
    }, [tempData, humidData]);

    return (
        <div className='p-12 flex flex-col md:flex-row gap-[50px] items-start'>
            <div
                className={`card w-full md:w-[1354px] ${openAll ? 'h-auto' : 'h-[96px]'} bg-white drop-shadow-xl p-2 ms-2 transition-all duration-300 ease-in-out`}>

                <div className='grid grid-rows-3 grid-flow-col p-4 relative'>
                    <button
                        className='absolute top-2 right-2 p-1 bg-transparent hover:bg-gray-200 rounded'
                        onClick={() => setOpenAll(!openAll)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 8 7">
                            <path fill="#000" fillOpacity="1" fillRule="evenodd" stroke="none" d="m3.646 5.354-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707z"></path>
                        </svg>
                    </button>

                    <div className='col-span-11 p-1 m-1 text-3xl font-bold font-montserrat text-black'>
                        InCube#1
                    </div>
                    <div className='row-span-12 col-span-12 text-black text-sm font-bold font-montserrat mt-6'>
                        {/* Konten lain bisa ditambahkan di sini */}
                    </div>
                </div>

                {openAll && (
                    <div className='mt-4 flex flex-row gap-16 items-start'>
                        {/* Menambahkan flex-grow untuk Chart agar lebih besar */}
                        <div className='w-[60%]'>
                            <Chart/>
                        </div>

                        <div className='flex flex-col items-start'>
                            <span className='text-black font-bold text-[32px]'>
                                Average
                            </span>
                            <div className='flex flex-col md:flex-row'>
                                <div className='card w-[170px] h-[110px] drop-shadow-xl p-2 ms-2 rounded-lg mt-4 '>
                                    <div className='h-1/3 bg-[#FFCC3F] rounded-t-lg font-montserrat p-2'>
                                        Temperature
                                    </div>
                                    <div className='h-1/2 bg-white rounded-b-lg text-black text-center font-bold'>
                                        {weeklyTempAvg !== null ? weeklyTempAvg.toFixed(2) : 'N/A'}
                                    </div>
                                </div>

                                <div className='card w-[170px] h-[110px] drop-shadow-xl p-2 ms-2 rounded-lg mt-4 '>
                                    <div className='h-1/3 bg-[#1AB44F] rounded-t-lg font-montserrat p-2'>
                                        Humidity
                                    </div>
                                    <div className='h-1/2 bg-white rounded-b-lg text-black text-center font-bold'>
                                        {weeklyHumidAvg !== null ? weeklyHumidAvg.toFixed(2) : 'N/A'}
                                    </div>
                                </div>

                            </div>
                            <div className='flex flex-col items-start'>
                                <span className='text-black font-bold text-[32px]'>
                                    Eggs
                                </span>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='card w-[170px] h-[110px] drop-shadow-xl p-2 ms-2 rounded-lg mt-4 '>
                                        <div className='h-1/3 bg-[#6184FF] rounded-t-lg font-montserrat p-2'>
                                            Active
                                        </div>
                                        <div className='h-1/2 bg-white rounded-b-lg text-black text-center font-bold'>
                                            0
                                        </div>
                                    </div>

                                    <div className='card w-[170px] h-[110px] drop-shadow-xl p-2 ms-2 rounded-lg mt-4 '>
                                        <div className='h-1/3 bg-[#FF79A1] rounded-t-lg font-montserrat p-2'>
                                            Hatched
                                        </div>
                                        <div className='h-1/2 bg-white rounded-b-lg text-black text-center font-bold'>
                                            0
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reports;
