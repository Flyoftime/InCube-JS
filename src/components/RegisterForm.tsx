"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
const SignUp = () => {
  const router = useRouter();
  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [alert, setAlert] = useState(false);

  console.log({ username, email, password });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    try {
      const response = await axios.post("/api/register", {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Registrasi Berhasil",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal",
            title: "custom-swal-title",
            icon: "custom-swal-icon",
          },
        });
        router.push("/login");
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Gagal Registrasi. Silakan coba lagi.",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal",
            title: "custom-swal-title",
            icon: "custom-swal-icon",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Gagal Registrasi. Silakan coba lagi.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
    } finally {
      setIsloading(false);
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (username.length < 3 || username.length > 20) {
      setError("Username harus memiliki panjang antara 3 dan 20 karakter.");
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError("Username hanya boleh berisi huruf dan angka.");
    } else {
      setError("");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email tidak valid.");
    } else {
      setError("");
    }

    if (password.length < 8 || password.length > 20) {
      setError("Password harus memiliki panjang antara 8 dan 20 karakter.");
    } else {
      setError("");
    }
  }, [username, email, password]);
  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title-signin">Create Account</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button
          type="submit"
          className="form-button"
          disabled={!!error || isloading}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
