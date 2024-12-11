"use client"
import { checkTokenValidity } from "@/lib/check-validity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../component/Loader/Loader";

const SuperAdminPannel = () => {

    const [isClient, setIsClient] = useState(false);

    const router = useRouter();
    useEffect(() => {
      if (checkTokenValidity() === 'SA') {
          setIsClient(true);
        } else {
          router.push("/login");
        }
      }, []);

      if (!isClient) return <Loader />;

  return (
    <div className="h-screen flex align-center justify-center text-4xl bg-base-200">
      <div>Welcome to SuperAdminPannel</div>
    </div>
  )
}

export default SuperAdminPannel