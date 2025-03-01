import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // New Expense Inputs
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      const expensesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesList);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Format Firestore Timestamp
  const formatDate = (date) => {
    if (!date) return "No Date";
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return date;
  };

  // Add New Expense
  const addExpense = async () => {
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "expenses"), {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date), // Storing as Date
      });

      // Reset input fields
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");

      fetchExpenses(); // Refresh list
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Filtered & Sorted Data
  const filteredExpenses = expenses.filter((expense) =>
    expense.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) =>
    sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
  );

  // Pie Chart Data
  const categoryTotals = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Sort Button */}
      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort by Amount ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </button>

      {/* Add Expense Form */}
      <div className="add-expense">
        <h2>Add Expense</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addExpense}>➕ Add Expense</button>
      </div>

      {/* Expense List */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pie Chart */}
      <div className="chart-container">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Dashboard;
