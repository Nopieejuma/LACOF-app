# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

catatan use navigat ebejir
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // proses login berhasil
    navigate("/dashboard"); // pindah ke halaman dashboard
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}


jumlah berapa kali login
import { useState } from "react";

function LoginCounter() {
  const [loginCount, setLoginCount] = useState(0);

  const handleLogin = () => {
    setLoginCount(loginCount + 1);
    console.log("Login ke-" + (loginCount + 1));
  };

  return (
    <div>
      <p>Jumlah login: {loginCount}</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

nambahin code untuk mengjitung jumlah login
const [error, setError] = useState("");
  const [loginCount, setLoginCount] = useState(0); // 👉 tambahkan ini
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    setLoginCount((prev) => prev + 1); // 👉 tambahkan ini untuk hitung percobaan login

<!-- Buat project baru -->
<!-- di direktori C : mkdir nama-project
npm create vite@latest project-app -- --template react
 pilih react dan javascirpt
 npm install
 npm run dev
 komponen helloworld "export default function HelloWorld(){
    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
        </div>
    )
}

"isi file main.jsx
import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <HelloWorld/>
        </div>
   nested components
   export default function Container({children}){
    return(
        <div>
            <h1>Pemrograman Framework Lanjutan</h1>
            <br/>
                {children}
            <br/>
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )



resuable components
export default function UserForm() {
  return (
		...
        <InputField label="Nama" type="text" placeholder="Silahkan ketik Nama..."/>
		
        <InputField label="Email" type="email" placeholder="Silahkan ketik EMail..."/>

        <InputField label="Tanggal Lahir" type="date" />
		...
  );
}

resuable components
export default funciton Infut Filed({ label, type, placeholder})}{

return(
<div classname=mb-3>
<label classname="blok text gray-700 mb-1>{label}</label>
<input
type={type}
placeholder={placeholder}
classnem="w-full p-2 rounded border gray
>
</div>
)}





STATE

hitung gaji form export default function HitungGajiForm() {
	return (
		<div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Hitung Gaji Bersih</h2>

				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Gaji Pokok
					</label>
					<input
						type="number"
						placeholder="Masukkan jumlah gaji"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Pajak: <b class="text-red-500">11%</b>
					</label>
				</div>

				<div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
					<p className="font-semibold">
						Total Take Home Pay (THP): Rp 0
					</p>
				</div>
			</div>
		</div>
	);
}

deklarasi state gaji
    const[gaji, setGaji] = useState("");
    const total= gaji-(gaji*pajak)
    
    event handling inputan 

    <input
    type="number
    placeholder={placeholder}
classnem="w-full p-2 rounded border gray
onChange={(e)} => setGaji(e.target.value)}

untuk mendapat info total 

<div>
<h1>Total gaji bersih : Rp {total.Gaji.tolocalString()}</h1>
</div>


info jika gaji tidak diisi 

{!gaji ? (
<div classname="text red border red mt-4 p-3 bg red">
<h1>Masukan yang valid</h1>
</div>
)}
    >
 )-->