

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LogoutButton from "../logout/page"; // adjust path as needed

// Inside your return JSX
<LogoutButton />


export default function PlanPage() {

  const router = useRouter();


  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [username, setUsername] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate]= useState("");
  const [end_date, setEndDate]= useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [travelType, setTravelType] = useState("solo");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);
      setIsCheckingAuth(false);
    }
  }, []);  


  const handleSubmit = async () => {
    setLoading(true);
    setItinerary("");
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${api}/trips/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source, destination, start_date, end_date, budget, currency, travel_type: travelType }),
      });

      const data = await response.json();
      setItinerary(data.itinerary || "No itinerary found.");
    } catch (error) {
      setItinerary("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  if (isCheckingAuth) return null;


  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white p-6">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6"
      >
        <h1 className="text-4xl font-bold text-center text-white">Plan Your Trip</h1>
        <h2 className="text-xl font-semibold text-left mb-4">
        Welcome, {username} 
       </h2>
       <h2 className="text-xl font-semibold text-right mb-4">
        <LogoutButton/>
      </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="From (e.g. Delhi)"
            className="p-3 rounded-lg text-black"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type="text"
            placeholder="To (e.g. Agra)"
            className="p-3 rounded-lg text-black"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            placeholder="from date"
            className="p-3 rounded-lg text-black"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="till date"
            className="p-3 rounded-lg text-black"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Budget"
            className="p-3 rounded-lg text-black"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-3 rounded-lg text-black"
          >
            <option value="₹">₹ INR</option>
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="£">£ GBP</option>
          </select>
          <select
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="p-3 rounded-lg text-black md:col-span-2"
          >
            <option value="solo">Solo</option>
            <option value="family">Family</option>
            <option value="honeymoon">Honeymoon</option>
            <option value="friends">Friends</option>
            <option value="group">Group</option>
            <option value="spiritual">Spiritual</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition shadow-md"
        >
          Generate Itinerary
        </button>

        {loading && (
          <div className="space-y-3">
            <Skeleton height={20} count={5} baseColor="#3b82f6" highlightColor="#60a5fa" />
          </div>
        )}

        {!loading && itinerary && (
          <div className="bg-white/20 p-6 rounded-xl mt-4 text-white whitespace-pre-line">
            <h2 className="text-xl font-semibold mb-2">Generated Itinerary:</h2>
            <p>{itinerary}</p>
          </div>
        )}
      </motion.section>
    </main>
  );
}
