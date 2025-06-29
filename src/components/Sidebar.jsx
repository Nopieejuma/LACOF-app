import { BiChevronRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";
import { CiCoffeeCup } from "react-icons/ci";
import { BiChevronsRight } from "react-icons/bi";
import { BiCoffeeTogo } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { CgAdd } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
   <div
  id="sidebar"
  className="flex min-h-screen w-85 flex-col bg-white p-10 shadow-lg "
>
  <div
    id="logo-title"
    className="flex items-center font-inter-extrabold font-bold text-[40px] text-amber-950 "
  >
    <img src="img/kopi-removebg-preview.png" alt="Logo" className="w-25 h-25 " />
    Lacof
  </div>

      {/* fitur search */}
      <div id="search" className="flex justify-between items-center p-4">
        <div id="search-bar" className="relative w-50 max-w-lg">
          <input
            id="search-input"
            className="border border-gray-200 p-2 pr-10 bg-white w-full rounded-md outline-none"
            type="text"
            placeholder="Search Here..."
          />
          <FaSearch
            id="search-icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
          />
        </div>
      </div>

      <ListMenu />
      <div className="mt-6 px-4">
  <button
    onClick={() => {
      localStorage.clear(); // bersihkan sesi login jika ada
      window.location.href = "https://project-lacof-app-guest.vercel.app/"; // ganti dengan link dashboard teman
    }}
    className="w-full bg-gray-100 hover:bg-gray-200 text-red-600 font-medium py-2 px-4 rounded-lg transition duration-200"
  >
    ⎋ Logout
  </button>
</div>

       <div className="flex flex-col items-center justify-center text-center space-y-2 text-sm text-gray-500 mt-2">
  <div id="footer-text" className="text-green-600 text-sm">
    <span>Semangat terus! Jangan lupa update progres harian 🌱</span>
  </div>
  
  <span id="footer-brand" className="font-semibold text-gray-500">
    Lacof Coffee Management Portal
  </span>
  <p id="footer-copyright" className="font-light text-gray-400">
    &copy; 2025 Lacof Team - All rights reserved.
  </p>
</div>

    </div>
  );
}
