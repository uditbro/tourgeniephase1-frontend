export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <a href="/login" className="underline text-blue-300 hover:text-white mr-4">Login</a>
      <a href="/signup" className="underline text-blue-300 hover:text-white">Signup</a>

      <h1 className="text-5xl font-bold mb-6">🌍 TourGenie</h1>
      <p className="text-xl max-w-xl mb-10">
        Plan smarter, travel better. Personalized AI itineraries tailored to your budget, time, and vibe.
      </p>
      <a
        href="/plan"
        className="px-6 py-3 bg-blue-400 hover:bg-blue-500 rounded-xl text-lg font-semibold transition"
      >
        Plan My Trip 🚀
      </a>
    </main>
  );
}
