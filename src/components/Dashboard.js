import React, { useState } from "react";
import "../styles.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-02-21", category: "Food", amount: 500 },
    { id: 2, date: "2025-02-20", category: "Transport", amount: 300 },
    { id: 3, date: "2025-02-19", category: "Shopping", amount: 1500 },
  ]);

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Add or Edit Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!date || !category || !amount) {
      alert("Please fill all fields!");
      return;
    }

    const newTransaction = {
      id: editingId || transactions.length + 1,
      date,
      category,
      amount: parseFloat(amount),
    };

    if (editingId) {
      // Edit transaction
      setTransactions(transactions.map((txn) => (txn.id === editingId ? newTransaction : txn)));
      setEditingId(null);
    } else {
      // Add new transaction
      setTransactions([...transactions, newTransaction]);
    }

    // Clear input fields
    setDate("");
    setCategory("");
    setAmount("");
  };

  // Delete Transaction
  const handleDelete = (id) => {
    setTransactions(transactions.filter((txn) => txn.id !== id));
  };

  // Edit Transaction
  const handleEdit = (txn) => {
    setDate(txn.date);
    setCategory(txn.category);
    setAmount(txn.amount);
    setEditingId(txn.id);
  };

  return (
    <div className="dashboard-container">
      <h2>Finance Dashboard</h2>

      {/* Transaction Form */}
      <form className="transaction-form" onSubmit={handleAddTransaction}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="Category (e.g., Food, Rent)" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">{editingId ? "Update Transaction" : "Add Transaction"}</button>
      </form>

      {/* Transaction Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.category}</td>
              <td>{txn.amount}</td>
              <td>
                <button onClick={() => handleEdit(txn)}>✏️ Edit</button>
                <button onClick={() => handleDelete(txn.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;