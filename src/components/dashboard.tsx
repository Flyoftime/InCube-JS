'use client'
import React, { useEffect, useState } from 'react'
import Paho from 'paho-mqtt'

type ClientType = {
  subscribe: (topic: string) => void;
}

const Dashboard = () => {
  const [temp, setTemp] = useState();
  const [Humid, setHumid] = useState();
  const [mintemp, setMinTemp] = useState();
  const [newMinTemp, setNewMinTemp] = useState();
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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

    setTemp(payload);
    setHumid(payload);
  };


  const subscribeToTopic = (topic: any) => {
    if (client && isConnected && topic) {
      client.subscribe(topic);
    } else {
      return
    }
  };

  useEffect(() => {
    subscribeToTopic('MirsabAnwar/Temp');
    subscribeToTopic('MirsabAnwar/Humid');
  }, [client, isConnected]);

  if (!isConnected) {
    connectToMqttBroker()
  }

  const publishNewMinTemp = () => {
    const topic = "MirsabAnwar/newtemp"
    const message = newMinTemp

    if (client && isConnected && topic && message) {
      client.publish(topic, message);
    } else if(!client && !isConnected) {
      return
    } else if(!topic && !message) {
      return
    }
  };

  // console.log("Temp : ", temp)
  // console.log("Humid : ",Humid)
  return (
    <div className='p-2 '>
      <div className=" card w-[1354px] h-[234px] shadow-xl bg-[#ffffff]  ">
        <div className="card-body p-4 ">
          <h2 className="font-bold text-[#2d3748] text-[32px] font-montserrat">InCube #1</h2>
          <p className='text-[#000] font-thin text-xs font-montserrat text-[22px] '>(+49)Eggs</p>
          <div className="card-actions justify-end">
            <button className="btn bg-[#ffff] text-[#ffb800] font-bold font-montserrat">VIEW ALL</button>
          </div>
          <div className='flex gap-7'>
            <div className='card w-[405px] h-[80px] bg-[rgb(221,221,221)] p-2 '>
              <div className='grid grid-rows-3 grid-flow-col p-2'>
                <div className=' col-span-8 text-xs font-bold font-montserrat'>Temperature</div>
                <div className='  row-span-2 col-span-1 text-black text-s font-bold font-montserrat '>{}</div>
                <div className='row-end row-span-3 bg-[#ffb800] w-[48px] h-[45px] valo rounded-md p-2'>
                  <img src='/assets/outline.png' width={30} height={30} ></img>
                </div>
              </div>
            </div>
            <div className='card w-[405px] h-[80px] bg-[rgb(221,221,221)] p-2'>
              <div className='grid grid-rows-3 grid-flow-col p-2'>
                <div className=' col-span-8 text-xs font-bold font-montserrat'>Temperature</div>
                <div className='  row-span-2 col-span-1 text-black text-s font-bold font-montserrat '>{}</div>
                <div className='row-end row-span-3 bg-[#ffb800] w-[48px] h-[45px] valo rounded-md p-2'>
                  <img src='/assets/outline.png' width={30} height={30} ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Dashboard