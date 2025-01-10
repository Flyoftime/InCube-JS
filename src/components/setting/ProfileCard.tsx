"use client";
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

type ProfileData = {
  name: string;
  age: string;
  gender: string;
  contact: string;
  job: string;
  users: {
    email: string;
    username: string;
  };
};

const ProfileCard: React.FC<any> = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/settings/edit-profile");
  };

  useEffect(() => {
    // Ambil userId dari localStorage
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    // Fetch API untuk mendapatkan data profil
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`); // Gunakan userId di URL
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log(data);

        setProfileData(data.data.data); // pastikan data berada dalam field 'data'
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return (
      <div className="card w-full md:w-[696px] h-[600px] bg-[#ffff] drop-shadow-xl ms-2 p-4 font-montserrat">
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold">
            profile does not exist.
          </div>
        </div>
        <a
          href="settings/add-profile" // Use <a> tag for navigation
          className="btn text-base block mt-4 mx-2 text-center bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 flex justify-center items-center"
        >
          <FaPlus className="mr-2" /> create profile
        </a>
      </div>
    );
  }

  return (
    <div className="card items-center w-full md:w-[597px] h-auto bg-[#ffff] drop-shadow-xl p-2 font-montserrat overflow-y-auto">
      <div className="rounded-lg lg:mx-[105px] mx-0 px-4 lg:pb-[30px] pb-0 max-w-[1000px] w-full">
        {/* Header section with "Your Profile" text and icon aligned to the corners */}
        <div className="flex justify-between items-center mb-4 ">
          <h3 className="text-lg font-semibold text-black">Your Profile</h3>
          <div className="cursor-pointer">
            <FaEllipsisV size={20} className="text-gray-600" />
          </div>
        </div>

        {/* Profile image */}
        <div className="lg:w-28 w-[90px] lg:h-28 h-[90px] rounded-full bg-gray-200 mx-auto overflow-hidden mt-6">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile"
            className="object-cover"
          />
        </div>

        {/* Profile details */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-xl font-medium text-black">{profileData.name}</p>
          <p className="text-gray-500">{profileData.users.email}</p>
        </div>

        {/* Additional details */}
        <div className="mt-6 space-y-2 text-left lg:w-[200px] w-full mx-auto">
          <div className="flex justify-between">
            <span className="text-black font-medium">Age:</span>
            <span className="text-black">{profileData.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black font-medium">Gender:</span>
            <span className="text-black">{profileData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black font-medium">Contact:</span>
            <span className="text-black">{profileData.contact}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black font-medium">Job:</span>
            <span className="text-black">{profileData.job}</span>
          </div>
        </div>

        {/* Edit button */}
        <button
          className="btn w-full bg-yellow-500 text-white py-2 mt-4 mb-6 lg:mb-0 rounded-md font-medium hover:bg-yellow-600"
          onClick={handleEditClick}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
