'use client'
import React, { useEffect, useState } from 'react'
import Paho from 'paho-mqtt'
import Chart from './Chart';
import Image from 'next/image';

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
}

const Dashboard = () => {
  const [temp, setTemp] = useState<string | null>(null);
  const [humid, setHumid] = useState<string | null>(null);
  const [mintemp, setMinTemp] = useState();
  const [newMinTemp, setNewMinTemp] = useState();
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [openall, setOpenall] = useState(false);



  const connectToMqttBroker = async () => {
    const clientID = "clientID-tes-mirsabanwar-mqtt";
    const host = "broker.hivemq.com";
    const port = 8000;

    const mqttClient: any = new Paho.Client(host, Number(port), clientID);

    mqttClient.onMessageArrived = messageArrived

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
    const payload = message.payloadString;
    const topic = message.destinationName;

    if (topic === 'MirsabAnwar/Temp') {
      setTemp(payload);
    } else if (topic === 'MirsabAnwar/Humid') {
      setHumid(payload);
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
      subscribeToTopic('MirsabAnwar/Temp');
      subscribeToTopic('MirsabAnwar/Humid');
    }
  }, [client, isConnected]);

  // const publishNewMinTemp = () => {
  //   const topic = "MirsabAnwar/newtemp"
  //   const message = newMinTemp

  //   if (client && isConnected && topic && message) {
  //     client.publish(topic, message);
  //   } else if(!client && !isConnected) {
  //     return
  //   } else if(!topic && !message) {
  //     return
  //   }
  // };

  // console.log("Temp : ", temp)
  // console.log("Humid : ",Humid)

  return (
    <div className='p-2'>
      <div className="card w-full lg:w-[1400px] h-[300x] shadow-xl bg-[#ffffff]">
        <div className="card-body p-4">
          <h2 className="font-bold text-[#2d3748] text-[24px] md:text-[32px] font-montserrat">InCube #1</h2>
          <p className='text-[#000] font-thin text-[16px] md:text-[22px] font-montserrat'>(+49)Eggs</p>
          <div className="card-actions justify-end">
            <button className="btn bg-[#ffff] text-[#ffb800] font-bold font-montserrat" onClick={(e) => {
            e.preventDefault();
            setOpenall(!openall);
          }}>VIEW ALL</button>
          </div>
          <div className='flex flex-col md:flex-row gap-10 items-start '>
            <div className='card w-full md:w-[500px] h-[80px] bg-[rgb(221,221,221)] p-2'>
              <div className='grid grid-rows-3 grid-flow-col p-2'>
                <div className='col-span-11 text-xs font-bold font-montserrat'>Temperature</div>
                <div className='row-span-12 col-span-12 text-black text-s font-bold font-montserrat  mt-6'>{temp}</div>
                <div className='row-end row-span-3 bg-[#ffb800] w-[48px] h-[48px] valo rounded-md p-2'>
                  <Image src='/assets/outline.png' width={30} height={30} alt="Temperature Icon" />
                </div>
              </div>
            </div>
            <div className='card w-full md:w-[405px] h-[80px] bg-[rgb(221,221,221)] p-2'>
              <div className='grid grid-rows-3 grid-flow-col p-2'>
                <div className='col-span-8 text-xs font-bold font-montserrat'>Humidity</div>
                <div className='row-span-12 col-span-12 text-black text-s font-bold font-montserrat mt-6'>{humid}</div>
                <div className='row-end row-span-3 bg-[#9AE26D] w-[48px] h-[48px] valo rounded-md p-2'>
                  <img src='/assets/outline.png' width={30} height={30} alt="Humidity Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {openall === true &&(
      <div>
        <Chart />
      </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
