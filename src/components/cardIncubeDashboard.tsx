"use client";
import React, { useEffect, useState } from "react";
import Paho from "paho-mqtt";
import Chart from "./Chart";
import Image from "next/image";

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
};
interface incubeProductProps {
  productId?: string; // Menentukan format nilai sensor, seperti "°C", "%", dll.
  telur?: number; //
  name?: string;
  lebar?: number; //
  tinggi?: number; //
}

const CardIncubeDashboard: React.FC<incubeProductProps> = ({
  productId = "",
  telur = 0,
  name = "",
  lebar = 0,
  tinggi = 0,
}) => {
  const [temp, setTemp] = useState<number[]>([]); // store temperature data
  const [humid, setHumid] = useState<number[]>([]); // store humidity data
  const [labels, setLabels] = useState<string[]>([]);
  const [gas, setGas] = useState<number[]>([]);
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [openall, setOpenall] = useState(false);
  const [statusFan, setStatusFan] = useState<string | null>(null);
  const [statusLam, setStatusLam] = useState<string | null>(null);
  const [statusFlame, setStatusFlame] = useState<string | null>(null);
  const [statusIp, setStatusIp] = useState<string | null>(null);
  const [statusCon, setStatisCon] = useState<string>("Disconnected");

  const connectToMqttBroker = async () => {
    const clientID = "clientID-incube-mqtt";
    const host = "broker.hivemq.com";
    const port = 8000;

    const mqttClient: any = new Paho.Client(host, Number(port), clientID);

    mqttClient.onMessageArrived = messageArrived;

    // Handle connection lost
    mqttClient.onConnectionLost = (responseObject: any) => {
      if (responseObject.errorCode !== 0) {
        setIsConnected(false);

        // Wait 2 seconds before setting the status to "Disconnected"
        setTimeout(() => {
          setStatisCon("Disconnected");
        }, 2000);
      }
    };

    mqttClient.connect({
      onSuccess: () => {
        setClient(mqttClient);
        setIsConnected(true);
        setStatisCon("Connected");
      },
      onFailure: (message: any) => {
        setIsConnected(false);
        setStatisCon("Disconnected");
      },
    });
  };

  const messageArrived = (message: any) => {
    const payload = message.payloadString;
    const topic = message.destinationName;

    if (topic === `${productId}/Temp`) {
      const newTemperature = parseFloat(payload);
      setTemp((prevData) => {
        const updatedData = [...prevData, newTemperature];
        return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
      });

      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, "0");
      const currentMinute = now.getMinutes().toString().padStart(2, "0");
      const currentSecond = now.getSeconds().toString().padStart(2, "0");
      setLabels((prevLabels) => {
        const newLabel = `${currentHour}:${currentMinute}:${currentSecond}`;
        const updatedLabels = [...prevLabels, newLabel];
        return updatedLabels.length > 60
          ? updatedLabels.slice(1)
          : updatedLabels;
      });
    } else if (topic === `${productId}/Humid`) {
      const newHumidity = parseFloat(payload);
      setHumid((prevData) => {
        const updatedData = [...prevData, newHumidity];
        return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
      });
    } else if (topic === `${productId}/Gas`) {
      const newGas = parseFloat(payload);
      setGas((prevData) => {
        const updatedData = [...prevData, newGas];
        return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
      });
    } else if (topic === `${productId}/FanStatus`) {
      setStatusFan(payload);
    } else if (topic === `${productId}/LampStatus`) {
      setStatusLam(payload);
    } else if (topic === `${productId}/FlameStatus`) {
      setStatusFlame(payload);
    } else if (topic === `${productId}/ipWifi`) {
      setStatusIp(payload);
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

  // Berlangganan ke topik setelah client terhubung
  useEffect(() => {
    if (client && isConnected) {
      subscribeToTopic(`${productId}/Temp`);
      subscribeToTopic(`${productId}/Humid`);
      subscribeToTopic(`${productId}/Gas`);
      subscribeToTopic(`${productId}/FanStatus`);
      subscribeToTopic(`${productId}/LampStatus`);
      subscribeToTopic(`${productId}/FlameStatus`);
      subscribeToTopic(`${productId}/ipWifi`);
    }
  }, [client, isConnected]);
  useEffect(() => {
    if (temp && humid) {
      setLabels((prevLabels) => [
        ...prevLabels,
        new Date().toLocaleTimeString(), // Menambahkan waktu saat data diterima
      ]);
    }
  }, [temp, humid]);

  const isDangerous =
    (temp !== null &&
      temp[temp.length - 1] >= 50 &&
      humid !== null &&
      humid[humid.length - 1] < 30 && // Akses elemen pertama dari array
      gas !== null &&
      gas[gas.length - 1] > 1400) ||
    statusFlame === "DETECTED";

  return (
    <div>
      <div className="p-4 lg:ml-60 ml-40">
        <div className="card w-[350px] md:w-[1430px] h-[300x] shadow-xl bg-[#ffffff]">
          <div className="card-body p-4">
            <h2 className="font-bold text-[#2d3748] text-2xl lg:text-3xl font-montserrat">
              InCube #{productId}
            </h2>
            <p className="text-[#000] font-thin text-[16px] md:text-[22px] font-montserrat">
              (+{telur})Eggs
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn bg-[#ffff] text-[#ffb800] font-bold font-montserrat text-[10px]"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenall(!openall);
                }}
              >
                VIEW ALL
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-start ">
              <div className="card w-full md:w-[500px] h-[80px] bg-[rgb(221,221,221)] px-2">
                <div className="grid grid-rows-3 grid-flow-col p-2">
                  <div className="col-span-11 text-sm font-bold font-montserrat">
                    Temperature
                  </div>
                  <div className="row-span-12 col-span-12 text-gray-700 lg:text-xl text-lg font-bold font-montserrat  mt-6">
                    {temp[temp.length - 1]}°C
                  </div>
                  <div className="row-end row-span-3 bg-[#ffb800] w-[48px] h-[48px] valo rounded-md p-2 mt-2">
                    <Image
                      src="/assets/outline.png"
                      width={30}
                      height={30}
                      alt="Temperature Icon"
                    />
                  </div>
                </div>
              </div>
              <div className="card w-full md:w-[405px] h-[80px] bg-[rgb(221,221,221)] px-2">
                <div className="grid grid-rows-3 grid-flow-col p-2">
                  <div className="col-span-8 text-sm font-bold font-montserrat">
                    Humidity
                  </div>
                  <div className="row-span-12 col-span-12 text-gray-700 lg:text-xl text-lg font-bold font-montserrat mt-6">
                    {humid[humid.length - 1]}%
                  </div>
                  <div className="row-end row-span-3 bg-[#9AE26D] w-[48px] h-[48px] valo rounded-md p-2 mt-2">
                    <img
                      src="/assets/outline.png"
                      width={30}
                      height={30}
                      alt="Humidity Icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {openall === true && (
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
              {/* Chart Section */}

              <Chart
                temperatureData={temp} // Pastikan data dalam bentuk array
                humidityData={humid} // Pastikan data dalam bentuk array
                labels={labels} // Menggunakan state labels yang sudah disiapkan
              />
              {/* Card Section */}
              <div className="w-full lg:w-1/4 p-2  my-6 rounded-xl lg:mt-[50px] mt-2 lg:ml-5 ml-0 px-4 lg:px-0">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {/* Card 1 */}
                  <div className="bg-[rgb(221,221,221)] rounded-lg shadow-md px-6 py-[8px]">
                    <div className="mr-5">
                      <p className="text-sm text-gray-500 font-montserrat">
                        Status Fan
                      </p>
                      <p className="lg:text-xl text-lg font-bold text-gray-900">
                        {statusFan || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[rgb(221,221,221)] rounded-lg shadow-md px-6 py-[8px]">
                    <div className="mr-5">
                      <p className="text-sm text-gray-500 font-montserrat">
                        Status Lamp
                      </p>
                      <p className="lg:text-xl text-lg font-bold text-gray-900">
                        {statusLam || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div
                    className={`rounded-lg shadow-md px-6 py-[8px] ${
                      isDangerous ? "bg-red-500" : "bg-[rgb(221,221,221)]"
                    }`}
                  >
                    <div className="mr-5">
                      <p className="text-sm text-gray-500 font-montserrat">
                        Status Flame
                      </p>
                      <p className="lg:text-xl text-lg font-bold text-gray-900">
                        {statusFlame || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-[rgb(221,221,221)] rounded-lg shadow-md px-6 py-[8px]">
                    <div className="mr-5">
                      <p className="text-sm text-gray-500 font-montserrat">
                        Condition
                      </p>
                      <p className="lg:text-xl text-lg font-bold text-gray-900">
                        {isDangerous ? "Berbahaya" : "Aman"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/4 lg:mt-[56px] mt-2 px-4 pb-2 lg:px-0">
                <div className="bg-white border rounded-md shadow-md lg:mx-4 mx-0 p-2">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 px-6 pt-[6px]">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Network Connection
                    </h3>
                    <div className="text-green-500 text-xl mb-2">📶</div>
                  </div>
                  <div className="flex flex-col items-center mb-4">
                    <span className="text-base text-green-500 bg-green-100 px-3 py-1 rounded-full">
                      {statusCon || "-"}
                    </span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg mx-3 px-6 py-[8px]">
                    <p className="text-sm text-gray-600">
                      IP {statusIp || "-"}{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-4 px-6 pt-[6px]">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Info product
                    </h3>
                  </div>
                  {/* Device Info */}
                  <div className="bg-gray-100 p-3 rounded-lg mb-2 mx-3 px-6 py-[8px]">
                    <p className="text-sm text-gray-600">{name}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg mb-2 mx-3 px-6 py-[8px]">
                    <p className="text-sm text-gray-600">
                      {lebar} x {tinggi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardIncubeDashboard;
