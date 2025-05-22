import { useState } from "react";
import InputField from "./components/InputField";

export default function KaryawanForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [divisi, setDivisi] = useState("");

  // validasi inputannyaa
  const isUsernameValid = /^[A-Za-z]+$/.test(username); // Hanya huruf
  const isPasswordValid = /^\d{3}$/.test(password); // Harus 3 angka
  const isDivisiValid = divisi !== ""; // Tidak boleh kosong

  // pengecekan dta valid
  const isFormValid = isUsernameValid && isPasswordValid && isDivisiValid;

  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-orange-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Data Karyawan
        </h2>
        <img
          src="img/undraw_updated-resume_287i.svg"
          alt="logo"
          className="w-40 h-auto mx-auto my-4"
        />

        <InputField
          label="Username"
          type="text"
          placeholder="Silahkan ketik Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isUsernameValid && (
          <p className="text-red-500 text-sm">
            Username tidak boleh mengandung angka!
          </p>
        )}

        <InputField
          label="Password"
          type="password"
          placeholder="Masukkan 4 angka..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && (
          <p className="text-red-500 text-sm">Password harus 3 angka!</p>
        )}

        <InputField
          label="Divisi"
          type="select"
          value={divisi}
          onChange={(e) => setDivisi(e.target.value)}
          options={["IT", "HR", "Finance", "Marketing"]}
        />
        {!isDivisiValid && (
          <p className="text-red-500 text-sm">Silakan pilih divisi!</p>
        )}

        <div
          className={`mt-4 p-3 border ${
            isFormValid
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-red-100 border-red-500 text-red-700"
          }`}
        >
          <p className="font-semibold text-center">
            {isFormValid ? "Data Diterima " : "Data Tidak Diterima "}
          </p>
        </div>
      </div>
    </div>
  );
}
