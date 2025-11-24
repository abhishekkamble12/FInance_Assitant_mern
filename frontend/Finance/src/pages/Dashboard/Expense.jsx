import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AddExpenseForm from '../../components/dashboard/AddExpenseForm';
import { ExpenseOverviewLineChart } from '../../components/dashboard/Charts';
import api from '../../utils/api';
import * as XLSX from 'xlsx';

const Expense = () => {
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/get-all-expenses');
      setExpenses(response.data.expense || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError(error.response?.data?.message || 'Failed to load expenses. Please check your connection.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      await api.post('/add-expense', newExpense);
      alert('Expense added successfully!');
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add expense';
      alert(`Failed to add expense: ${errorMessage}`);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/delete-expense/${id}`);
        alert('Expense deleted successfully!');
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(expenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "expenses.xlsx");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Expenses Overview</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Expense Overview Section (Line Chart) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Expense Trends (Daily)</h2>
        <div className="w-full h-64 flex items-center justify-center">
          <ExpenseOverviewLineChart expenses={expenses} />
        </div>
      </div>

      {/* Recorded Expenses Display */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Recorded Expenses</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAddExpenseForm(true)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Expense
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
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="p-4 border rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow duration-200 relative group"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{expense.emoji || '🍕'}</span>
                <div>
                  <p className="font-medium">{expense.category}</p>
                  <p className="text-sm text-gray-500">${expense.amount.toFixed(2)} - {new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteExpense(expense._id)}
                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Delete Expense"
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

      {showAddExpenseForm && (
        <AddExpenseForm onClose={() => setShowAddExpenseForm(false)} onAddExpense={handleAddExpense} />
      )}
    </DashboardLayout>
  );
};

export default Expense;
