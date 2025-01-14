import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const PassKeyModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [passkey, setPassKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/user-premium/passkey`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, pass_access: passkey }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      Swal.fire({
        position: "top",
        title: "Akses di terima",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
    } catch (error) {
      Swal.fire({
        position: "top",
        title: "Akses di tolak",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false); // Nonaktifkan loading
    }
  };

  const subscribeToPasskey = () => {
    // Logic for subscribing to the newsletter
    console.log("Entering passkey:", passkey);
    setShowModal(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <a
        onClick={() => setShowModal(true)}
        className="btn text-base mt-4 mx-2 text-center bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 flex justify-center items-center"
      >
        <FaPlus className="mr-2" /> Klik this to Activate
      </a>

      {/* Modal */}
      {showModal && (
        <div>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-gray-500 opacity-75"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal content */}
          <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-yellow-100 rounded-full">
                  <svg
                    className="h-6 w-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#000fs2"
                    strokeWidth="0.36"
                  >
                    <path
                      d="M3.885 5.237C3.205 5.868 2.75 6.893 2.75 8.5V15.5C2.75 17.107 3.205 18.131 3.885 18.763C4.575 19.404 5.615 19.75 7 19.75H17C18.385 19.75 19.425 19.404 20.115 18.763C20.795 18.131 21.25 17.107 21.25 15.5V8.5C21.25 6.893 20.795 5.868 20.115 5.237C19.425 4.596 18.385 4.25 17 4.25H7C5.615 4.25 4.575 4.596 3.885 5.237Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pass key incube
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your product and pass key to unlock.
                  </p>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="mt-2 p-2 border border-yellow-500 rounded-md w-full focus:outline-none focus:ring-none focus:border-yellow-500 bg-white text-black"
                    placeholder="Product ID"
                  />
                  <input
                    type="email"
                    value={passkey}
                    onChange={(e) => setPassKey(e.target.value)}
                    className="mt-2 p-2 border border-yellow-500 rounded-md w-full focus:outline-none focus:ring-none focus:border-yellow-500 bg-white text-black"
                    placeholder="12345678"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleFormSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {isLoading ? "Loading..." : "Save"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassKeyModal;
