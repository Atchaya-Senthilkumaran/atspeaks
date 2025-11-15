import React from "react";

export default function Tag({ text }) {
  return (
    <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#1f3492]/10 to-[#c8348f]/10 border border-[#1f3492]/20 text-[10px] sm:text-xs md:text-sm font-medium text-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
      {text}
    </div>
  );
}
