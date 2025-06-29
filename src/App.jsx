import "./assets/tailwind.css"
import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Loading from "./components/Loading"

// Lazy-loaded pages
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Product = lazy(() => import("./pages/Product"))
const Customer = lazy(() => import("./pages/Customer"))
const Orders = lazy(() => import("./pages/OrdersList"))
const Report = lazy(() => import("./pages/report"))
const ReportDetail = lazy(() => import("./pages/reportDetail"))
const Review = lazy(() => import("./pages/review"))
const ReviewDetail = lazy(() => import("./pages/reviewDetail"))
const Advice = lazy(() => import("./pages/Advice"))
const AdviceDetail = lazy(() => import("./pages/AdviceDetail"))
const Quote = lazy(() => import("./pages/Quote"))
const QuoteDetail = lazy(() => import("./pages/QuoteDetail"))
const Pengeluaran = lazy(() => import("./pages/pengeluaran"))
const PengeluaranDetail = lazy(() => import("./pages/pengeluaranDetail"))
const Loker = lazy(() => import("./pages/loker"))
const Tim = lazy(() => import("./pages/tim"))
const Testimoni = lazy(() => import("./pages/testimoni"))
const Artikel = lazy(() => import("./pages/Artikel"))
const Booking = lazy(() => import("./pages/Booking"))
const User = lazy(() => import("./pages/user"))
const Galeri = lazy(() => import("./pages/Galeri"))
const Kontak = lazy(() => import("./pages/Kontak"))
const FAQ = lazy(() => import("./pages/FAQ"))

// Auth
const Login = lazy(() => import("./components/auth/Login"))
const Register = lazy(() => import("./components/auth/Register"))
const Forgot = lazy(() => import("./components/auth/Forgot"))

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"))
const AuthLayout = lazy(() => import("./layouts/AuthLayout"))

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="customers" element={<Customer />} />
          <Route path="orders" element={<Orders />} />
          <Route path="report" element={<Report />} />
          <Route path="report/:filter/:index" element={<ReportDetail />} />
          <Route path="review" element={<Review />} />
          <Route path="review/:id" element={<ReviewDetail />} />
          <Route path="advice" element={<Advice />} />
          <Route path="advice/:id" element={<AdviceDetail />} />
          <Route path="quote" element={<Quote />} />
          <Route path="quote/:id" element={<QuoteDetail />} />
          <Route path="pengeluaran" element={<Pengeluaran />} />
          <Route path="pengeluaran/:id" element={<PengeluaranDetail />} />
          <Route path="pengeluarandetail" element={<PengeluaranDetail />} />
          <Route path="loker" element={<Loker />} />
          <Route path="tim" element={<Tim />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="testimoni" element={<Testimoni />} />
          <Route path="booking" element={<Booking />} />
          <Route path="user" element={<User />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="kontak" element={<Kontak />} />
          <Route path="faq" element={<FAQ />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
