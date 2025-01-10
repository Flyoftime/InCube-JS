"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";

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

const UpdateAddressForm: React.FC = () => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false); // Handle submission state
  const [idAddress, setIdAddress] = useState<number>();

  const router = useRouter();

  const userId = localStorage.getItem("id");
  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const fetchAddressData = async () => {
      try {
        const response = await fetch(`/api/address/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Address data");
        }
        const data = await response.json();
        setAddressData(data.data.data);
        setIdAddress(data.data.data.id);
      } catch (error) {
        console.error("Error fetching Address data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddressData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const userId = idAddress;

      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`/api/address/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error("Failed to update Address data");
      }

      // Redirect to the address listing or settings page after successful update
      Swal.fire({
        position: "top",
        title: "Berhasil Tersimpan",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
      router.push("/settings");
    } catch (error) {
      Swal.fire({
        position: "top",
        title: "Gagal Tersimpan",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
      console.error("Error updating Address data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!addressData) {
    return <div>No address data found.</div>;
  }

  return (
    <div className="p-4 lg:ml-60 ml-40 w-[350px] md:w-[1430px] flex flex-col items-center mt-5">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-black">
            Update Your Address
          </h3>
        </div>

        <form className="space-y-4 text-base" onSubmit={handleFormSubmit}>
          <div>
            <label className="text-base font-medium text-gray-700">
              Provinsi
            </label>
            <input
              type="text"
              name="provinsi"
              className="mt-1 w-full rounded-md border border-gray-200 bg-gray-100 text-black p-1"
              value={addressData.provinsi}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">
              Kota/Kabupaten
            </label>
            <input
              type="text"
              name="Kabupaten"
              className="mt-1 w-full rounded-md border border-gray-100 bg-gray-100 text-black p-1"
              value={addressData.Kabupaten}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">
              Kecamatan
            </label>
            <input
              type="text"
              name="Kecamatan"
              className="mt-1 w-full rounded-md border border-gray-200 bg-gray-100 text-black p-1"
              value={addressData.Kecamatan}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">
              Kelurahan
            </label>
            <input
              type="text"
              name="Kelurahan"
              className="mt-1 w-full rounded-md border border-gray-200 bg-gray-100 text-black p-1"
              value={addressData.Kelurahan}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">
              Kode Pos
            </label>
            <input
              type="text"
              name="Kode_pos"
              className="mt-1 w-full rounded-md border border-gray-200 bg-gray-100 text-black p-1"
              value={addressData.Kode_pos}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">
              Nama Jalan, Gedung, No. Rumah
            </label>
            <textarea
              name="alamat_lengkap"
              className="mt-1 w-full rounded-md border border-gray-200 bg-gray-100 text-black p-1 py-3"
              value={addressData.alamat_lengkap || ""}
              rows={2}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddressForm;
