import React from "react";

export default function Card({ title, desc }) {
  return (
    <div className="rounded-xl border p-6 shadow-sm bg-white">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm">{desc}</p>
      <div className="mt-4">
        <a className="text-sm font-medium text-indigo-600">Learn more →</a>
      </div>
    </div>
  );
}
