import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const AddIncomeForm = ({ onClose, onAddIncome }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [emoji, setEmoji] = useState('💰'); // Default emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const categories = [
    'Salary',
    'Freelance',
    'Investments',
    'Stocks',
    'Bitcoin',
    'Bank Transfer',
    'Youtube',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date || !category) {
      alert('Please fill in all fields.');
      return;
    }
    onAddIncome({ name, amount: parseFloat(amount), date, category, emoji });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Income</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emoji">
              Emoji
            </label>
            <div className="relative">
              <button
                type="button"
                className="text-2xl p-2 border rounded hover:bg-gray-100 focus:outline-none w-full text-left"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {emoji} <span className="text-sm text-gray-500 ml-2">(Click to change)</span>
              </button>
              {showEmojiPicker && (
                <div className="absolute z-10 mt-2">
                  <EmojiPicker onEmojiClick={(emojiObject) => {
                    setEmoji(emojiObject.emoji);
                    setShowEmojiPicker(false);
                  }} />
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Income Title
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Salary, Dividends"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeForm;
