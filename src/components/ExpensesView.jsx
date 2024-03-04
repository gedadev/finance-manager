import { useState } from "react";

function ExpensesView() {
  const [expenses, setExpenses] = useState([]);

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
