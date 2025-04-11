import { ItineraryProvider } from "@/context/ItineraryContext";
import './globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ItineraryProvider>
          {children}
        </ItineraryProvider>
      </body>
    </html>
  );
}
