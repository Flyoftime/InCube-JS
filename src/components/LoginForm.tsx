import { useRouter } from "next/navigation";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const singInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      const res = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      if (res.status === 200 || res.status === 201) {
        const userId = res.data.user.id;
        // console.log("ini di singin ", userId);

        localStorage.setItem("id", userId);
        console.log("Login berhasil, mengarahkan ke dashboard");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Berhasil",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal",
            title: "custom-swal-title",
            icon: "custom-swal-icon",
          },
        });
        router.push("/dashboard");
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Gagal login. Silakan coba lagi.",
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
        title: "Gagal login. Silakan coba lagi.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <img src="/assets/logo2 2.png" alt="logo" width={180} className="p-4" />
      <form className="form-signin" onSubmit={handleLogin}>
        <h1 className="form-title-singin">Sign In to InCube!</h1>
        {alert && (
          <div
            role="alert"
            className="alert alert-error fixed bottom-10 right-10 max-w-96 self"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-white shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white">Email atau password salah</span>
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="form-button" disabled={isLoading}>
          Login
        </button>
        <a className="find-password" href="#">
          Forget Password
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
