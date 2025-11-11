import React from "react";

export default function Stat({ title, subtitle }) {
  return (
    <div className="rounded-lg p-4 bg-gradient-to-tr from-white to-indigo-50 border">
      <div className="text-xl font-bold">{title}</div>
      <div className="text-sm text-slate-600">{subtitle}</div>
    </div>
  );
}
