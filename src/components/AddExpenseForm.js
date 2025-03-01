import React, { useState } from "react";

const AddExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.title && expense.amount && expense.category) {
      addExpense(expense);
      setExpense({ title: "", amount: "", category: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={expense.title}
        onChange={handleChange}
        required
      />

      <label>Amount:</label>
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        required
      />

      <label>Category:</label>
      <select name="category" value={expense.category} onChange={handleChange} required>
        <option value="" disabled>Select a Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Others">Others</option>
      </select>

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
