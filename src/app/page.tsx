import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Landingpage from "@/components/landingpage";
import Fitur from "@/components/fitur";
import AboutUs from "@/components/aboutUs";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar/>  
      <Landingpage/>
      <Fitur/>
      <AboutUs/>
      <Footer/>
    </main>

  );
}
