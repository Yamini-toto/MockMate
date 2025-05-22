// app/dashboard/_components/plans.jsx
import React from 'react';
import plans from '@/utils/planData';

export default function Plans() {
  return (
    <section id="plans" className="w-full py-16 flex flex-col items-center bg-gradient-to-t from-[#FFFEFF] to-[#D7FFFE]">
      <h2 className="text-3xl font-bold text-[#0a3d62] mb-6 tracking-wide">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {plans.map((plan, idx) => (
          <div key={idx} className="rounded-2xl shadow-xl bg-white border border-[#e1fffe] flex flex-col items-center p-8 transition-transform hover:scale-105">
            <h3 className="text-xl font-bold text-[#0a7a77] mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-[#0a3d62] mb-4">{plan.cost}</div>
            <ul className="mb-6 space-y-2 text-[#0a3d62]">
              {plan.offering.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#0a7a77] rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-auto px-6 py-2 rounded-full bg-[#0a7a77] text-white font-semibold shadow hover:bg-[#0a3d62] transition-colors">{plan.name === 'Free' ? 'Current Plan' : 'Upgrade'}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
