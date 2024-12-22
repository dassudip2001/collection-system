import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <div>
      <div className="grid  w-full h-screen bg-slate-200">
        <div className="flex justify-center items-center h-full w-full">
          <div className="text-center">
            <div className="flex justify-center items-center mb-3">
              <Image
                src="/color-palette.png"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
            <h1 className="text-5xl font-bold text-black">
              Artistry Unleashed
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Discover a world where imagination meets canvas, featuring
              extraordinary works <br />
              from talented artists around the globe.
            </p>
            <div className="flex flex-col md:flex-row mt-8 justify-center items-center space-y-4 md:space-y-0 md:space-x-11">
              <Link
                href="/gallery"
                type="button"
                className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2 mt-2"
              >
                <svg
                  className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="M8 17V9" />
                  <path d="M12 17V7" />
                  <path d="M16 17v-5" />
                </svg>
                Explore Gallery
              </Link>
              <Link
                href="/dashboard"
                type="button"
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                Submit Artwork
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
