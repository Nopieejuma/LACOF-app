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
      className="flex min-h-screen w-85 flex-col bg-white p-10 shadow-lg"
    >
      
      <div
        id="logo-title"
        className="flex items-center font-bold text-[40px] text-amber-950 mb-6"
      >
        <CiCoffeeCup className="mr-2" />
        Lacof
        <BiChevronRight className="ml-2" />
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

     
      <ListMenu/>

    
      <div
        id="profile-container"
        className="flex items-center space-x-2 pl-7 border-t border-gray-200 py-8"
      >
        <img
          id="profile-avatar"
          src="https://tse3.mm.bing.net/th/id/OIP.y7J8fwy4Na2QI0576FOjOwHaHa?rs=1&pid=ImgDetMain"
          className="w-12 h-12 rounded-full"
        />
        <span id="profile-text">
          Hai, <b>Novia-Admin</b>
        </span>
      </div>

      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center justify-between"
        >
          <div id="footer-text" className="text-amber text-sm">
            <span>Jangan lupa report harian mu ya!!</span>
          </div>
          <img
            id="footer-avatar"
            src="https://cdn-icons-png.flaticon.com/512/7181/7181220.png"
            className="w-18 h-18 rounded-full"
          />
        </div>
        <span id="footer-brand" className="font-bold text-gray-400">
          Lacof Coffee Admin Dashboard
        </span>
        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
