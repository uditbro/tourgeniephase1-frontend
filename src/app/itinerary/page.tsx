"use client";
import { useItinerary } from "@/context/ItineraryContext";

export default function ItineraryPage() {
  const { itinerary } = useItinerary();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Itinerary</h1>
      {itinerary.length === 0 ? (
        <p className="text-center">No itinerary found. Please plan a trip first.</p>
      ) : (
        <div className="grid gap-4">
          {itinerary.map((item: any, idx: number) => (
            <div key={idx} className="bg-white text-black rounded-xl p-4 shadow-md">
              <h2 className="font-semibold text-xl">{item.day} - {item.date}</h2>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Activity:</strong> {item.activity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
