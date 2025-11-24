import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCard from '../../components/dashboard/SummaryCard';
import { FinancialOverviewPieChart } from '../../components/dashboard/Charts';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContextFile';
import moment from 'moment';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = user?.id || user?._id;
      if (!userId) return;

      try {
        const response = await api.get(`/dashboard/${userId}`);
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    </DashboardLayout>
  );
  
  if (error) return <DashboardLayout><div className="text-red-500">{error}</div></DashboardLayout>;
  if (!dashboardData) return <DashboardLayout><div>No data available</div></DashboardLayout>;

  const { totalBalance, totalIncome, totalExpense, recentTransactions } = dashboardData;

  return (
    <DashboardLayout>
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Here's your financial overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Total Balance" amount={totalBalance} type="balance" />
        <SummaryCard title="Total Income" amount={totalIncome} type="income" />
        <SummaryCard title="Total Expense" amount={totalExpense} type="expense" />
      </div>

      {/* Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
             <Link to="/expenses" className="text-sm text-purple-600 font-medium hover:underline flex items-center">
                See All 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
             </Link>
          </div>
          
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                    <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                           {transaction.type === 'income' ? (
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                           ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                           )}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-base">{transaction.name || transaction.description}</h4>
                            <p className="text-xs text-gray-500">{moment(transaction.date).format('Do MMM YYYY')}</p>
                        </div>
                    </div>
                    <div className={`font-bold text-base ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                </div>
                ))}
            </div>
          ) : (
              <div className="text-center py-10 text-gray-500">No recent transactions found</div>
          )}
        </div>

        {/* Financial Overview (Pie Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Financial Overview</h2>
          <div className="flex-1 flex items-center justify-center min-h-[250px]">
             {/* Ensure Chart handles empty data gracefully */}
            {(totalIncome > 0 || totalExpense > 0) ? (
                <FinancialOverviewPieChart totalIncome={totalIncome} totalExpense={totalExpense} />
            ) : (
                <p className="text-gray-400 text-sm">No data to display</p>
            )}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="flex items-center">
                   <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                   <div>
                       <p className="text-xs text-gray-500">Income</p>
                       <p className="font-bold text-sm text-gray-800">${totalIncome.toFixed(0)}</p>
                   </div>
               </div>
               <div className="flex items-center">
                   <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                   <div>
                       <p className="text-xs text-gray-500">Expenses</p>
                       <p className="font-bold text-sm text-gray-800">${totalExpense.toFixed(0)}</p>
                   </div>
               </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
