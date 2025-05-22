import React from 'react';

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img src={image} alt={`Error ${code}`} className="max-w-4xl mb-6" />
      <h1 className="text-5xl font-bold text-red-600 mb-2">Error {code}</h1>
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
}