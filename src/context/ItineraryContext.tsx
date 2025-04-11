"use client";
import { createContext, useContext, useState } from "react";

export const ItineraryContext = createContext<any>(null);

export const ItineraryProvider = ({ children }: { children: React.ReactNode }) => {
  const [itinerary, setItinerary] = useState([]);

  return (
    <ItineraryContext.Provider value={{ itinerary, setItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => useContext(ItineraryContext);
