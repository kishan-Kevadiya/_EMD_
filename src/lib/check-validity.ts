'use client'
import {jwtDecode} from "jwt-decode";

export interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export const checkTokenValidity = (): boolean | string => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    console.log("No token found in localStorage.");
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp > currentTime) {
      console.log("Token is valid.",decoded.role);
      return decoded.role;
    } else {
      console.log("Token has expired. Removing token from localStorage...");
      localStorage.removeItem("token"); 
      return false;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    return false;
  }
};
