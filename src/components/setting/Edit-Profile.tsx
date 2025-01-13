// ProfileForm Component
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type ProfileData = {
  name: string;
  age: string;
  gender: string;
  contact: string;
  job: string;
};

const EditProfileForm: React.FC<any> = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    age: "",
    gender: "",
    contact: "",
    job: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [idUser, setIdUser] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID not provided");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setIdUser(data.data.id);
        setProfileData(data.data); // Adjust path as necessary
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = idUser;
      console.log(id);

      const response = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
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
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 lg:ml-60 ml-40 w-[350px] md:w-[1430px] flex flex-col items-center my-5">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Edit Profile
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
            <input
              type="text"
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
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

export default EditProfileForm;
