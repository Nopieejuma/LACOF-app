import { RiArticleLine } from "react-icons/ri"; 
import { MdOutlineRateReview } from "react-icons/md"; 
import { SiGooglephotos } from "react-icons/si"; 
import { TbBrandGooglePhotos } from "react-icons/tb"; 
import { AiOutlineUserAdd } from "react-icons/ai"; 
import { BsChatDots } from "react-icons/bs"; 
import { RiReservedLine } from "react-icons/ri"; 
import { FaQuestion } from "react-icons/fa"; 
import { MdArticle } from "react-icons/md"; 
import { FcFaq } from "react-icons/fc"; 
import { AiOutlineTeam } from "react-icons/ai"; 
import { AiOutlineSound } from "react-icons/ai"; 
import { FcMoneyTransfer } from "react-icons/fc"; 
import { MdReviews } from "react-icons/md"; 
import { CgLogOut } from "react-icons/cg"; 
import { FaChevronRight } from "react-icons/fa"; 

import { CiCoffeeCup } from "react-icons/ci"; 
import { MdDashboard } from "react-icons/md"; 
import { NavLink } from "react-router-dom";


export default function PageHeader() {
 const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl p-4 space-x-2
  ${isActive ? 
    "bg-[#B4CD93] text-gray-800 font-extrabold" : 
    "text-gray-600 hover:text-gray-800 hover:bg-[#B4CD93] hover:font-extrabold"
  }`;


    return (
    <div id="sidebar-menu" className="mt-5">
                <ul id="menu-list" className="space-y-">
                    <li>
                        <NavLink id="menu-1" to="/"
                        className={menuClass}>
                           <MdDashboard className="mr-2 text-xl" /> Dashboard  </NavLink>
                      </li>
                    <li>
                        <NavLink id="menu-2" to="/Product"
                        className={menuClass}>
                           <CiCoffeeCup className="mr-2 text-xl"/>Produk</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-3" to="/Artikel"
                        className={menuClass}>
                          <RiArticleLine  className="mr-2 text-xl"/>Artikel</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-4" to="/FAQ"
                        className={menuClass}>  <FaQuestion  className="mr-2 text-xl" />FAQ</NavLink>
                      </li> 
                       <li>
                        <NavLink id="menu-5" to="/Tim"
                        className={menuClass}>  <AiOutlineTeam className="mr-2 text-xl" />Tim</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-6" to="/Loker"
                        className={menuClass}> <AiOutlineSound  className="mr-2 text-xl" />Loker</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-7" to="/Testimoni"
                        className={menuClass}><MdOutlineRateReview  className="mr-2 text-xl" />Testimoni</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-8" to="/Booking"
                        className={menuClass}> <RiReservedLine className="mr-2 text-xl" />Booking</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-9" to="/Kontak"
                        className={menuClass}> <BsChatDots  className="mr-2 text-xl" />Chat</NavLink>
                        <li>
                        <NavLink id="menu-10" to="/user"
                        className={menuClass}> <AiOutlineUserAdd  className="mr-2 text-xl" />Role User</NavLink>
                      </li>
                      </li>
                      <li>
                        <NavLink id="menu-11" to="/Galeri"
                        className={menuClass}> <SiGooglephotos  className="mr-2 text-xl" />Galeri</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-12" to="/Login"
                        className={menuClass}> <CgLogOut className="mr-2 text-xl" />Logout</NavLink>
                      </li>


























                      {/* <li>
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
                        <li>
                        <NavLink id="menu-13" to="/Loker"
                        className={menuClass}> <AiOutlineSound  className="mr-2 text-xl" />Loker</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-14" to="/Tim"
                        className={menuClass}>  <AiOutlineTeam className="mr-2 text-xl" />Tim</NavLink>
                      </li>
                       <li>
                        <NavLink id="menu-15" to="/Testimoni"
                        className={menuClass}>  <BsFillChatLeftDotsFill  className="mr-2 text-xl" />Testimoni</NavLink>
                      </li>
                      <li>
                        <NavLink id="menu-16" to="/FAQ"
                        className={menuClass}>  <FcFaq className="mr-2 text-xl" />FAQ</NavLink>
                      </li> */}
                </ul>
            </div>
            );
        }