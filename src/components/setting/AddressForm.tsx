"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";

type AddressData = {
  name: string;
  Kecamatan: string;
  provinsi: string;
  Kabupaten: string;
  Kelurahan: string;
  Kode_pos: string;
  alamat_lengkap?: string;
  users: {
    email: string;
    username: string;
  };
};

const AddressForm: React.FC = () => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isLoading, setLoading] = useState(true); // Handle loading state

  const router = useRouter();
  const handleEditClick = () => {
    router.push("/settings/edit-address");
  };

  useEffect(() => {
    // Ambil userId dari localStorage
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
    // Fetch API untuk mendapatkan data profil
    const fetchAddressData = async () => {
      try {
        const response = await fetch(`/api/address/${userId}`); // Gunakan userId di URL
        if (!response.ok) {
          throw new Error("Failed to fetch Address data");
        }
        const data = await response.json();
        setAddressData(data.data.data); // pastikan data berada dalam field 'data'
      } catch (error) {
        console.error("Error fetching Address data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddressData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  // Show a message when address data is not found, and provide an option to create an address
  if (!addressData) {
    return (
      <div className="card w-full md:w-[696px] h-[600px] bg-[#ffff] drop-shadow-xl ms-2 p-4 font-montserrat">
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold">
            No address data found.
          </div>
        </div>
        <a
          href="settings/add-address" // Use <a> tag for navigation
          className="btn text-base block mt-4 mx-2 text-center bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 flex justify-center items-center"
        >
          <FaPlus className="mr-2" /> Add Address
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-md w-full max-w-[800px] bg-white font-montserrat">
      {/* Header section with "Your Address" text and icon aligned to the corners */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Your Address</h3>
        <div className="cursor-pointer">
          <FaEllipsisV size={20} className="text-gray-600" />
        </div>
      </div>

      <form className="space-y-4 text-base">
        <div>
          <label className="text-base font-medium text-gray-700">
            Provinsi
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1 "
            value={addressData?.provinsi || "kosong"}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kota/Kabupaten
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1 "
            value={addressData?.Kabupaten || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kecamatan
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1"
            value={addressData?.Kecamatan || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kelurahan
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1"
            value={addressData?.Kelurahan || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kode Pos
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1"
            value={addressData?.Kode_pos || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Nama Jalan, Gedung, No. Rumah
          </label>
          <textarea
            className="mt-1 w-full rounded-sm bg-gray-100 text-black p-1 py-3"
            value={addressData?.alamat_lengkap || ""}
            rows={2}
            disabled
          />
        </div>
      </form>
      <button
        className="btn w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 mt-4"
        onClick={handleEditClick}
      >
        Edit Address
      </button>
    </div>
  );
};

export default AddressForm;
