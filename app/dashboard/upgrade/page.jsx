// app/upgrade/page.jsx
import React from 'react';
import Plans from '../_components/plans';

export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-gradient-to-t from-[#FFFEFF] to-[#D7FFFE] flex flex-col items-center justify-center p-8">
      <Plans />
    </main>
  );
}
