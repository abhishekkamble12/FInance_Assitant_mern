import React from "react";
import Navbar from "../../components/layouts/Navbar";
import { Link } from "react-router-dom";

export default function FinanceLanding() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative isolate px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-bold text-white sm:text-7xl">
            Smart Finance Tracking For Everyone
          </h1>

          <p className="mt-6 text-lg text-gray-400 sm:text-xl">
            Track your income, control your expenses, visualize your spending habits,
            and manage your money like a pro — all in one dashboard.
          </p>

          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              to="/dashboard"
              className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              Go to Dashboard
            </Link>
            <Link to="/learn" className="text-sm font-semibold text-white">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

