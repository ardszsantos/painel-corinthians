import Image from "next/image";
import NewsLoader from "./components/loadNews";

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center">
        <Image
          src="/timãoLogo.png"
          alt="Next.js logo"
          width={280}
          height={280}
          priority
        />
      </div>
      <div className="mt-16">
        <NewsLoader />
      </div>
    </div>
  );
}