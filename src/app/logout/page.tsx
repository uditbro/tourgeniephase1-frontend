"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // ❌ removes token
    router.push("/"); // 🔁 redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
    >
      Logout
    </button>
  );
}
