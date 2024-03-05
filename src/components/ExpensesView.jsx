import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import axios from "axios";
import "../styles/expenses.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterOptions from "./FilterOptions";

function ExpensesView() {
  const [expenses, setExpenses] = useState([]);
  const [activeFilters, setActiveFilters] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-expenses");
        const data = response.data.map((obj) => ({
          ...obj,
          date: new Date(obj.date * 1000).toLocaleDateString(),
        }));
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const toggleFilters = () => {
    setActiveFilters(!activeFilters);
  };

  return (
    <section id="expenses" className="expenses-view">
      <div className="filters-selector">
        <span>
          Filters:
          <FilterListIcon className="filter-btn" onClick={toggleFilters} />
        </span>
        <span>
          | <FilterListOffIcon className="filter-btn" />
        </span>
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
      {activeFilters && <FilterOptions toggleFilters={toggleFilters} />}
    </section>
  );
}

export default ExpensesView;
