import React, { useState } from 'react';

function Tab({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-semibold ${activeTab === tab ? 'border-b-2 border-blue-500' : 'text-gray-600'}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tab;
