// app/components/Recipe.js
"use client";
import React from "react";
import Link from "next/link";

export default function Recipe({ name, image, id }) {
  return (
    <Link href={`./Main_Pages/Recipe_Display/${id}`}>
      <div 
        className="w-64 h-80 p-4 m-2 border rounded-lg flex flex-col cursor-pointer hover:shadow-lg transition-shadow" 
        style={{ backgroundColor: "#ec9b00" }}
      >
        <div className="h-20 mb-4">
          <h1 className="text-xl font-bold text-center overflow-hidden line-clamp-3">
            {name}
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img 
            src={image} 
            alt={`${name} image`} 
            className="w-48 h-48 object-cover rounded-md"
          />
        </div>
      </div>
    </Link>
  );
}

