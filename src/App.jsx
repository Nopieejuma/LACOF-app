import "./assets/tailwind.css";
import React from "react";
const Product = React.lazy(() => import("./pages/Product"));

// import Dashboard from "./pages/Dashboard";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const artikel = React.lazy(() => import("./pages/artikel"));

import { Route, Routes } from "react-router-dom";
// import Customers from "./pages/Customer";
const Customers = React.lazy(() => import("./pages/Customer"));
// import Orders from "./pages/Orders";
const Orders = React.lazy(() => import("./pages/Orders"));
const Error401 = React.lazy(() => import("./pages/Error401"));
// import Login from "./components/auth/Login";
const Login = React.lazy(() => import("./components/auth/Login"));
// import Register from "./components/auth/Register";
const Register = React.lazy(() => import("./components/auth/Register"));
// import Forgot from "./components/auth/Forgot";
const Forgot = React.lazy(() => import("./components/auth/Forgot"));
// import MainLayout from "./layouts/MainLayout";
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// import AuthLayout from "./layouts/AuthLayout";
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Advice = React.lazy(() => import("./pages/advice"));
const AdviceDetail = React.lazy(() => import("./pages/AdviceDetail"));
const Quote = React.lazy(() => import("./pages/Quote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const Review = React.lazy(() => import("./pages/review"));
import ReviewDetail from "./pages/reviewDetail";
// const StokDetail = React.lazy(() => import("./pages/stokDetail"));
// const StokDetail = React.lazy(() => import("./pages/stokDetail"));
import PengeluaranDetail from "./pages/pengeluaranDetail";

import Loading from "./components/Loading";
import { Suspense } from "react";
import Report from "./pages/report";
import ReportDetail from "./pages/reportDetail";
// import Review from "./pages/review";
// import Stok from "./pages/stok";
import Pengeluaran from "./pages/pengeluaran";
import Loker from "./pages/loker";
import Tim from "./pages/tim";
import Testimoni from "./pages/testimoni";
import FAQ from "./pages/FAQ";
import Artikel from "./pages/artikel";
import Booking from "./pages/Booking";
import User from "./pages/user";
import Galeri from "./pages/Galeri";
import Kontak from "./pages/kontak";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      {/* <Route path="/*" element={<NotFound />} /> */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
?          <Route path="Customers" element={<Customers />} />
          <Route path="Product" element={<Product />} />
          <Route path="Report" element={<Report />} />
          <Route path="/Report/:filter/:index" element={<ReportDetail />} />
          <Route path="Review" element={<Review />} />
          {/* <Route path="Stok" element={<Stok />} /> */}
          {/* <Route path="/stok" element={<Stok />} /> */}
        {/* <Route path="/stok/:id" element={<StokDetail />} /> */}
          <Route path="/Galeri" element={<Galeri />} />
                    <Route path="PengeluaranDetail" element={<PengeluaranDetail />} />

          {/* <Route path="/pengeluaran" element={<Pengeluaran />} /> */}
        <Route path="/pengeluaran/:id" element={<PengeluaranDetail />} />
          <Route path="Advice" element={<Advice />} />
          <Route path="AdviceDetail" element={<AdviceDetail />} />
          <Route path="/Advice/:id" element={<AdviceDetail />} />
          <Route path="Quote" element={<Quote />} />
          <Route path="QuoteDetail" element={<QuoteDetail />} />
          <Route path="/Quote/:id" element={<QuoteDetail />} />
          <Route path="/review" element={<Review />} />
        <Route path="/review/:id" element={<ReviewDetail />} />
         <Route path="Loker" element={<Loker />} />
          <Route path="Tim" element={<Tim />} />
                    <Route path="/Artikel" element={<Artikel />} />
                                        <Route path="/Testimoni" element={<Testimoni />} />
                                        <Route path="/Booking" element={<Booking/>} />

                                        <Route path="/user" element={<User/>} />

                                        <Route path="/Kontak" element={<Kontak/>} />


           <Route path="Testimoni" element={<Testimoni />} />
            <Route path="FAQ" element={<FAQ />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
