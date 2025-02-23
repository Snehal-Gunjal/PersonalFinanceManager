import React, { useState } from 'react';

function AddExpenseForm({ setExpenses }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses((prev) => [...prev, { description, amount, date }]);
    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleAddExpense}>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
