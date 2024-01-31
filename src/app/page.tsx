import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>  
      <div className="fixed w-full h-full top-0 left-0 -mt-96 overflow-hidden">
        <img src="/assets/Ellipse 1.png" className="w-full h-full -mt-18" />
      </div>
    </div>

  );
}
