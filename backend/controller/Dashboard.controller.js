// const IncomeModel = require("../model/Income.model");
// const ExpenseModel = require("../model/Expense.model");

// const getDashboardData = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         const incomes = await IncomeModel.find({ user: userId }).sort({ date: -1 });
//         const expenses = await ExpenseModel.find({ user: userId }).sort({ date: -1 });

//         const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
//         const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
//         const totalBalance = totalIncome - totalExpense;

//         const recentIncomes = incomes.slice(0, 5).map(i => ({...i.toObject(), type: 'income'}));
//         const recentExpenses = expenses.slice(0, 5).map(e => ({...e.toObject(), type: 'expense'}));

//         // Merge and sort for recent transactions
//         const recentTransactions = [...recentIncomes, ...recentExpenses]
//             .sort((a, b) => new Date(b.date) - new Date(a.date))
//             .slice(0, 5);

//         res.status(200).json({
//             totalBalance,
//             totalIncome,
//             totalExpense,
//             recentTransactions,
//             recentIncomes,
//             recentExpenses
//         });

//     } catch (error) {
//         console.error("Error in getDashboardData:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { getDashboardData };
const IncomeModel = require("../model/Income.model");
const ExpenseModel = require("../model/Expense.model");

const getDashboardData = async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch income and expense records from database
        const incomes = await IncomeModel.find({ user: userId }).sort({ date: -1 });
        const expenses = await ExpenseModel.find({ user: userId }).sort({ date: -1 });

        // Calculate total income, total expense, and balance
        const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const totalBalance = totalIncome - totalExpense;

        // Limit the number of recent transactions to 5 (after merging)
        const recentTransactions = [
            ...incomes.map(i => ({ ...i.toObject(), type: 'income' })),
            ...expenses.map(e => ({ ...e.toObject(), type: 'expense' }))
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date
            .slice(0, 5); // Get top 5 most recent transactions

        // Get the 5 most recent incomes and expenses separately (for specific use-cases)
        const recentIncomes = incomes.slice(0, 5).map(i => ({ ...i.toObject(), type: 'income' }));
        const recentExpenses = expenses.slice(0, 5).map(e => ({ ...e.toObject(), type: 'expense' }));

        // Send response with dashboard data
        res.status(200).json({
            totalBalance,
            totalIncome,
            totalExpense,
            recentTransactions, // Combined recent transactions
            recentIncomes,      // Top 5 recent incomes (for a separate section)
            recentExpenses      // Top 5 recent expenses (for a separate section)
        });

    } catch (error) {
        console.error("Error in getDashboardData:", error);
        res.status(500).json({ message: "An error occurred while fetching dashboard data. Please try again later." });
    }
};

module.exports = { getDashboardData };
