'use client'
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Landingpage from "@/components/landingpage";
import Fitur from "@/components/fitur";
import AboutUs from "@/components/aboutUs";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = (event:any) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <main>
      <Navbar scrollTop={scrollTop}/>  
      <Landingpage/>
      <Fitur/>
      <AboutUs/>
    </main>

  );
}
