import { AiOutlineArrowUp } from "react-icons/ai"; 
import { AiOutlineArrowDown } from "react-icons/ai"; 
import { AiFillFileAdd } from "react-icons/ai"; 
import { MdRestaurantMenu } from "react-icons/md"; 
import { MdDeliveryDining } from "react-icons/md"; 
import { BiStore } from "react-icons/bi"; 
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ListGambar from "../components/ListGambar";


export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader 
        title="Welcome back,  Novia"
        breadcrumb={["Admin", "Dashboard"]}
      >
        <button className="bg-amber-600 text-white px-3 py-3 rounded flex items-center">Export data <AiOutlineArrowUp className="ml-2" /></button>
        <button className="bg-green-400 text-white px-3 py-3 rounded flex items-center">Create report <AiOutlineArrowDown className="ml-2"  /></button>
        {/* <button className="bg-blue-400 text-white px-3 py-1 rounded">Help</button> */}
      </PageHeader>

      <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4 ">
        {/* Orders */}
        {/* <div id="count-orders" className="flex items-center space-x-5 bg-amber-100 rounded-lg shadow-md p-4 max-w-sm w-full hover:bg-amber-500 transition">
          <div id="orders-icon" className="bg-hijau rounded-full p-4">
            <BiStore  className="text-amber" />
          </div>
          <div id="orders-info" className="flex flex-col  ">
            <span id="orders-text" className=" font-bold text-amber-900 ">Total Orders</span>
            <span id="orders-count" className=" text-3xl font-bold text-amber-900">245</span>
          </div>
        </div> */}

        {/* Delivered */}
        {/* <div id="count-delivered" className="flex items-center space-x-5 bg-amber-100 rounded-lg shadow-md p-4 max-w-sm w-full hover:bg-amber-500 transition">
          <div id="delivered-icon" className="bg-biru rounded-full p-4">
            <MdDeliveryDining className="text-amber" />
          </div>
          <div id="delivered-info" className="flex flex-col">
            <span id="delivered-text" className=" font-bold text-amber-900">Total Delivered for Today</span>
            <span id="delivered-count" className="text-amber-900 font-bold text-3xl" > 78</span>
          </div>
        </div> */}

        {/* Canceled */}
        {/* <div id="count-canceled" className="flex items-center space-x-5 bg-amber-100 rounded-lg shadow-md p-4 max-w-sm w-full hover:bg-amber-500 transition">
          <div id="canceled-icon" className="bg-merah rounded-full p-4">
           <MdRestaurantMenu  className="text-amber" />
          </div>
          <div id="canceled-info" className="flex flex-col">
            <span id="canceled-text" className=" font-bold text-amber-900">Total Dine In For Today</span>
            <span id="canceled-count" className="text-3xl font-bold text-amber-900">167 </span>
          </div>
        </div> */}

        {/* Revenue */}
        {/* <div id="count-revenue" className="flex items-center space-x-5 bg-amber-100 rounded-lg shadow-md p-4 max-w-sm w-full hover:bg-amber-500 transition">
          <div id="revenue-icon" className="bg-kuning rounded-full p-4">
            <FaDollarSign className="text-amber" />
          </div>
          <div id="revenue-info" className="flex flex-col">
            <span id="revenue-text" className="font-bold text-amber-900">Total Pendapatan </span>
            <span id="revenue-amount" className="text-3xl font-bold text-amber-900">Rp. 10.987.000,00</span>
          </div>
        </div> */}
      </div>
      <button className="bg-amber-950 text-white px-7 py-3 rounded-full shadow hover:bg-amber-400 transition ">
        <center><AiFillFileAdd className="mr-4 text-2xl" /></center> Add Galleries 
        
</button>

<ListGambar/>
      

       
      </div>
   
  );
}
