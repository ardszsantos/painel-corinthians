import Image from "next/image";
import NewsLoader from "./components/loadNews";

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative flex justify-center group">
        <Image
          src="/timãoLogo.png"
          alt="logo do corinthians"
          width={280}
          height={280}
          priority
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm p-2 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Loading news from the previous 5 days.
        </div>
      </div>
      <div className="mt-16">
        <NewsLoader />
      </div>
    </div>
  );
}