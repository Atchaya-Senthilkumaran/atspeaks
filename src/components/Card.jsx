import React from "react";

export default function Card({ title, desc }) {
  return (
    <div className="rounded-xl border p-4 sm:p-5 md:p-6 shadow-sm bg-white">
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600 text-xs sm:text-sm">{desc}</p>
      <div className="mt-3 sm:mt-4">
        <a className="text-xs sm:text-sm font-medium text-indigo-600">Learn more →</a>
      </div>
    </div>
  );
}
