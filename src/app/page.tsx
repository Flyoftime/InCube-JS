import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Landingpage from "@/components/landingpage";
import Fitur from "@/components/fitur";
import AboutUs from "@/components/aboutUs";

export default function Home() {
  return (
    <div>
      <Navbar/>  
      <Landingpage/>
      <Fitur/>
      <AboutUs/>
    </div>

  );
}
