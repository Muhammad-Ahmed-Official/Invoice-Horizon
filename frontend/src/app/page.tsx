'use client'

import { useAuth } from "@/redux/authProvider";
import { redirect } from "next/navigation";

export default function HomePage() {
  const {user}  = useAuth();
  // console.log(user?.length);
  if(user?.length){
    redirect("/home");
  } else {
    redirect("sign-in")
  }

}