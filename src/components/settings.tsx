"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./setting/ProfileCard";
import AddressForm from "./setting/AddressForm";

type UserSubs = {
  id: number;
  id_cus: number;
  id_produk: string;
  start_sub: string;
  end_sub: string;
  created_at: string;
  produk: {
    id: string;
    nama: string;
    tinggi: number;
    lebar: number;
    kapasitas: number;
    telur: number;
    pass_access: string;
    price: number;
    created_at: string;
  };
  users: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
  };
};

const Settings = () => {
  const [userSubsData, setUserSubsData] = useState<UserSubs[] | null>(null);
  const [productId, setProductId] = useState<string | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIncu, setActiveIncu] = useState<number | null>(null);
  useEffect(() => {
    // Ambil userId dari localStorage
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("user id not found in localStorage");
      return;
    }

    // Fetch API untuk mendapatkan data profil
    const fetchUserSubsData = async () => {
      try {
        const response = await fetch(`/api/user-premium/${userId}`); // Gunakan userId di URL
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();

        setUserSubsData(data.data.data); // pastikan data berada dalam field 'data'
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSubsData();
  }, []);
  useEffect(() => {
    if (userSubsData) {
      setActiveIncu(userSubsData.length);
    }
  }, [userSubsData]);
  return (
    <div>
      <div className="p-4 lg:ml-60 ml-40 flex flex-col md:flex-row gap-[50px] items-start">
        <div className="rounded-lg bg-[#ffff] shadow-md px-6 py-[8px] md:w-[597px] h-[168px] w-full">
          <div className="mr-5">
            <p className="text-base text-black font-bold font-montserrat pt-2 ">
              Incube Active
            </p>
            <p className="lg:text-2xl text-lg font-bold text-gray-900 pt-[37px] flex justify-center items-center">
              {activeIncu} InCube
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-[#ffff] shadow-md px-6 py-[8px] md:w-[597px] h-[168px] w-full">
          <div className="mr-5">
            <p className="text-base text-black font-bold font-montserrat pt-2">
              Incube Active
            </p>
            <p className="lg:text-2xl text-lg font-bold text-gray-900 pt-[37px] flex justify-center items-center">
              29 Days Left
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 lg:ml-60 ml-40 flex flex-col md:flex-row gap-[50px] items-start">
        <ProfileCard></ProfileCard>
        <AddressForm></AddressForm>
      </div>
    </div>
  );
};

export default Settings;
