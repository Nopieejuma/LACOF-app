import { AiOutlineBell } from "react-icons/ai";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiFillFileAdd,
} from "react-icons/ai";
import { MdRestaurantMenu, MdDeliveryDining } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import ProductTable from "../components/ProductTable";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      {/* HEADER */}
      <PageHeader title="Admin Management" breadcrumb={["Admin", "Dashboard"]}>
        <div className="flex items-center ml-4 space-x-3">
          <img
            src="/img/avatar.png"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-left">
            <div className="text-gray-800 font-manrope-semi-bold text-sm">
              Novia Zulma
            </div>
            <div className="text-gray-400 font-manrope-regular text-xs">
              Admin
            </div>
          </div>
        </div>
        <AiOutlineBell className="mr-3 text-2xl" />
      </PageHeader>

      
      <h1 className="mt-5 mb-2 text-gray-800 font-manrope-semi-bold ml-5 text-xl">
        In the last 30 days
      </h1>

      {/* DASHBOARD CARD STATISTICS */}
      <div id="dashboard-grid" className="p-5 flex flex-wrap gap-4">
        {[
          { title: "Dine in", value: "30,000" },
          { title: "Take away", value: "250" },
          { title: "Delivery", value: "$400,000" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="relative w-[180px] h-[80px] rounded-md overflow-hidden shadow-md"
          >
            <div className="absolute inset-0 flex rotate-[-10deg] scale-125">
              <div className="w-1/4 bg-[#687057]"></div>
              <div className="w-1/4 bg-[#8D4E3C]"></div>
              <div className="w-1/4 bg-[#2E4739]"></div>
              <div className="w-1/4 bg-[#8A6E3C]"></div>
            </div>
            <div className="relative z-10 flex flex-col justify-center h-full px-4 text-white">
              <span className="text-3xl font-bold">{item.value}</span>
              <span className="text-sm">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT TABLE */}
      <div className="mt-10 px-5">
        <ProductTable />
      </div>
    </div>
  );
}
