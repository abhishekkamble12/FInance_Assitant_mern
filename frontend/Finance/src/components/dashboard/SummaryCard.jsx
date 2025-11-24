import React from 'react';

const SummaryCard = ({ title, amount, type }) => {
  let icon;
  let textColor;
  let iconBg;

  switch (type) {
    case 'balance':
      icon = (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
      );
      textColor = "text-purple-600";
      iconBg = "bg-purple-100 text-purple-600";
      break;
    case 'income':
      icon = (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
      textColor = "text-green-600"; // Darker text for amount
      iconBg = "bg-orange-100 text-orange-600"; // The icon in screenshot was orange
      break;
    case 'expense':
      icon = (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
      );
      textColor = "text-red-600";
      iconBg = "bg-red-100 text-red-600";
      break;
    default:
        icon = null;
        textColor = "text-gray-800";
        iconBg = "bg-gray-100";
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
            <h3 className="text-gray-500 text-sm font-semibold mb-1">{title}</h3>
            <p className={`text-3xl font-bold text-gray-800`}>${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBg}`}>
            {icon}
        </div>
    </div>
  );
};

export default SummaryCard;
