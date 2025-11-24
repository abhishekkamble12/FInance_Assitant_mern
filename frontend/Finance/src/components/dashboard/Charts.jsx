import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Filler);

export const FinancialOverviewPieChart = ({ totalIncome, totalExpense }) => {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#F97316', '#9333EA'], // Orange for Income, Purple for Expense
        hoverBackgroundColor: ['#EA580C', '#7E22CE'],
        borderWidth: 0,
      },
    ],
    // Duplicate label removed
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Custom legend in Home.jsx
      },
      tooltip: {
          callbacks: {
              label: function(context) {
                  let label = context.label || '';
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
                  }
                  return label;
              }
          }
      }
    },
    cutout: '70%', // Donut chart style
  };

  return <Pie data={data} options={options} />;
};

export const SpendingTrendsBarChart = ({ expenses }) => {
  // Group expenses by date (simplified for now, assuming pre-processed or simple list)
  // In a real app, you might need to aggregate data by day here or in the parent
  // For this example, let's assume 'expenses' is an array of { date: 'YYYY-MM-DD', amount: 100 }
  
  // Sort by date
  const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Aggregate by date
  const aggregated = sortedExpenses.reduce((acc, curr) => {
    const date = curr.date.split('T')[0]; // Ensure YYYY-MM-DD
    acc[date] = (acc[date] || 0) + curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(aggregated);
  const dataValues = Object.values(aggregated);

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Spending',
        data: dataValues,
        backgroundColor: '#EF4444',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Last 30 Days Spending',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const IncomeSourcesPieChart = ({ incomes }) => {
  // Aggregate by source
  const aggregated = incomes.reduce((acc, curr) => {
    acc[curr.source] = (acc[curr.source] || 0) + curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(aggregated);
  const dataValues = Object.values(aggregated);
  
  // Generate random colors or use a palette
  const backgroundColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'
  ];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export const IncomeOverviewBarChart = ({ incomes }) => {
    const sortedIncomes = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const aggregated = sortedIncomes.reduce((acc, curr) => {
      const date = curr.date.split('T')[0];
      acc[date] = (acc[date] || 0) + curr.amount;
      return acc;
    }, {});
  
    const labels = Object.keys(aggregated);
    const dataValues = Object.values(aggregated);
  
    const data = {
      labels,
      datasets: [
        {
          label: 'Income',
          data: dataValues,
          backgroundColor: '#10B981',
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
            display: false,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
};

export const ExpenseOverviewLineChart = ({ expenses }) => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const aggregated = sortedExpenses.reduce((acc, curr) => {
      const date = curr.date.split('T')[0];
      acc[date] = (acc[date] || 0) + curr.amount;
      return acc;
    }, {});
  
    const labels = Object.keys(aggregated);
    const dataValues = Object.values(aggregated);
  
    const data = {
      labels,
      datasets: [
        {
          label: 'Expense',
          data: dataValues,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
            display: false,
        },
      },
    };
  
    return <Line data={data} options={options} />;
};
