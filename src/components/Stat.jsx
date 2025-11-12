import React from "react";

export default function Stat({ title, subtitle }) {
  return (
    <div className="rounded-lg p-3 sm:p-4 bg-gradient-to-tr from-white to-indigo-50 border">
      <div className="text-lg sm:text-xl md:text-2xl font-bold">{title}</div>
      <div className="text-xs sm:text-sm text-slate-600">{subtitle}</div>
    </div>
  );
}
