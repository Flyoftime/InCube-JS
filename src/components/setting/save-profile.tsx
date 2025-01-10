"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type ProfileData = {
  id_user: number;
  name: string;
  age: string;
  gender: string;
  contact: string;
  job: string;
};

const SaveProfileForm: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    id_user: parseInt(localStorage.getItem("id") || "0"), // changed to parseInt
    name: "",
    age: "",
    gender: "",
    contact: "",
    job: "",
  });
  const [loading, setLoading] = useState<boolean>(false); // changed loading state to false initially
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loading state

    try {
      // Use POST instead of PUT to create a new address
      const response = await fetch(`/api/user`, {
        method: "POST", // Changed to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      console.log(profileData);

      console.log(response);

      if (!response.ok) {
        const errorText = await response.text(); // Get error response text
        console.error("Error response:", errorText);
        throw new Error("Failed to create address");
      }

      // Redirect to a confirmation page or address listing page
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
      router.push("/settings"); // Adjust the redirect path as needed
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
      console.error("Error creating address:", error);
    } finally {
      setLoading(false); // stop loading state after the request
    }
  };

  return (
    <div className="p-4 lg:ml-60 ml-40 w-[350px] md:w-[1430px] flex flex-col items-center my-5">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Create Profile
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 font-medium">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={profileData.age}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-gray-700 font-medium"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={profileData.contact}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="job" className="block text-gray-700 font-medium">
              Job
            </label>
            <input
              type="text"
              id="job"
              name="job"
              value={profileData.job}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="btn w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveProfileForm;
