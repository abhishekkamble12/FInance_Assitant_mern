import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AddIncomeForm from '../../components/dashboard/AddIncomeForm';
import { IncomeOverviewBarChart } from '../../components/dashboard/Charts';
import api from '../../utils/api';
import * as XLSX from 'xlsx';

const Income = () => {
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    try {
      const response = await api.get('/get-incomes');
      setIncomes(response.data.income || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleAddIncome = async (newIncome) => {
    try {
      await api.post('/add-income', newIncome);
      alert('Income added successfully!');
      fetchIncomes();
    } catch (error) {
      console.error('Error adding income:', error);
      alert('Failed to add income');
    }
  };

  const handleDeleteIncome = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        await api.delete(`/delete-income/${id}`);
        alert('Income deleted successfully!');
        fetchIncomes();
      } catch (error) {
        console.error('Error deleting income:', error);
        alert('Failed to delete income');
      }
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(incomes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Incomes");
    XLSX.writeFile(wb, "incomes.xlsx");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Income Overview</h1>

      {/* Income Overview Section (Bar Chart) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Income Trends (Daily)</h2>
        <div className="w-full h-64 flex items-center justify-center">
          <IncomeOverviewBarChart incomes={incomes} />
        </div>
      </div>

      {/* Income Sources Display */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Income Sources</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAddIncomeForm(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Income
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Download Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomes.map((income) => (
            <div
              key={income._id}
              className="p-4 border rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-200 relative group"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{income.emoji || '💰'}</span>
                <div>
                  <p className="font-medium">{income.name || income.title || 'Income'}</p>
                  <p className="text-xs text-gray-400">{income.category}</p>
                  <p className="text-sm text-gray-500">${income.amount.toFixed(2)} - {new Date(income.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteIncome(income._id)}
                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Delete Income"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showAddIncomeForm && (
        <AddIncomeForm onClose={() => setShowAddIncomeForm(false)} onAddIncome={handleAddIncome} />
      )}
    </DashboardLayout>
  );
};

export default Income;
