'use client'

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { AuthController } from "@/hooks/authController";
import { Footer } from "./components/Footer";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
        <main className="flex-1">
        </main>
      <Footer /> 

      <AuthController
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}
