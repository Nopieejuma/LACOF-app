import React from "react";
// import Advice from "../components/Advice";
import Advice from "./advice";

export default function AdviceDetail() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#3e2e20]">Inspirational Advice</h2>
      <Advice />
    </div>
  );
}