import { FcMoneyTransfer } from "react-icons/fc"; 
import { GiKnapsack } from "react-icons/gi"; 
import { MdReviews } from "react-icons/md"; 
import { TbReportAnalytics } from "react-icons/tb"; 
import { TbReportMoney } from "react-icons/tb"; 
import { CgLogOut } from "react-icons/cg"; 
import { FaChevronRight } from "react-icons/fa"; 
import { AiOutlineSetting } from "react-icons/ai"; 
import { MdAccountCircle } from "react-icons/md"; 
import { MdAccountBox } from "react-icons/md"; 
import { AiFillFileText } from "react-icons/ai"; 
import { BsInfoCircleFill } from "react-icons/bs"; 
import { BsFillChatFill } from "react-icons/bs"; 
import { FcStackOfPhotos } from "react-icons/fc"; 
import { CiCoffeeCup } from "react-icons/ci"; 
import { MdFastfood } from "react-icons/md"; 
import { MdDashboard } from "react-icons/md"; 
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function PageHeader() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4  space-x-2
    ${isActive ? 
        "text-hijau bg-orange-200 font-extrabold" : 
        "text-gray-600 hover:text-hijau hover:bg-orange-200 hover:font-extrabold"
    }`
    return (
    <div id="sidebar-menu" className="mt-5">
                <ul id="menu-list" className="space-y-">
                    <li>
                        <NavLink id="menu-1" to="/"
                        className={menuClass}>
                           <MdDashboard className="mr-2 text-xl" /> Dashboard <FaChevronRight className="ml-30 " /> </NavLink>
                      </li>
                    <li>
                        <NavLink id="menu-2" to="/Orders"
                        className={menuClass}>
                           <CiCoffeeCup className="mr-2 text-xl"/>Orders <FaChevronRight className="ml-37 " /></NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-3" to="/Error401"
                        className={menuClass}>  <FcStackOfPhotos className="mr-2 text-xl"/>Error 401 <FaChevronRight className="ml-33 " /></NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-4" to="/Customers"
                        className={menuClass}> <BsFillChatFill className="mr-2 text-xl" />Customer Service <FaChevronRight className="ml-17 " /></NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-5"to="/setting"
                        className={menuClass}><AiOutlineSetting className="mr-2 text-xl" />Setting <FaChevronRight className="ml-35 " /></NavLink>
                      </li>
                      <div className="border-b py-4" ></div>
                      <li>
                        <NavLink id="menu-6" to="/Login"
                        className={menuClass}> <CgLogOut className="mr-2 text-xl" />Logout</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-7" to="/Report"
                        className={menuClass}><TbReportAnalytics className="mr-2 text-xl" />Report Penjualan</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-8" to="/Review"
                        className={menuClass}><MdReviews className="mr-2 text-xl" />Rekap review</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-9" to="/Stok"
                        className={menuClass}><GiKnapsack className="mr-2 text-xl" />Stock</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-10" to="/Pengeluaran"
                        className={menuClass}> <FcMoneyTransfer className="mr-2 text-xl" />Rekap Pengeluaran</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-11" to="/Advice"
                        className={menuClass}> <FcMoneyTransfer className="mr-2 text-xl" />Advice</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-12" to="/Quote"
                        className={menuClass}> <FcMoneyTransfer className="mr-2 text-xl" />Quotes</NavLink>
                      </li>
                </ul>
            </div>
            );
        }