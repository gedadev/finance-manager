import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import axios from "axios";
import "../styles/expenses.css";

function ExpensesView() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-expenses");
        setExpenses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <section id="expenses" className="expenses-view">
      <div className="filters-container">
        <ul className="view-filters">
          <li>Filter by:</li>
          <li>Date</li>
          <li>Category</li>
          <li>Subcategory</li>
        </ul>
      </div>
      <div className="table-container">
        <ul className="view-table">
          <li className="table-item">
            <ul className="table-props">
              <li>Date</li>
              <li>Pay Method</li>
              <li>Category</li>
              <li>Subcategory</li>
              <li>Recurrent</li>
              <li>Store</li>
              <li>Item</li>
              <li>Price</li>
            </ul>
          </li>
          {expenses.map((item) => (
            <ListItem key={item._id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ExpensesView;
