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
  const [filters, setFilters] = useState({});
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [dateRange, setDateRange] = useState({
    initDate: Date.now() - 86400000 * 35,
    endDate: Date.now(),
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-expenses?initDate=${dateRange.initDate}&endDate=${dateRange.endDate}`
        );
        const data = response.data.map((obj) => ({
          ...obj,
          date: new Date(obj.date).toLocaleDateString(),
        }));
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [dateRange]);

  useEffect(() => {
    const update = expenses.filter((item) =>
      Object.entries(filters).reduce((accumulator, [key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(item[key].toLowerCase()) && accumulator;
        } else {
          return value === item[key].toLowerCase() && accumulator;
        }
      }, true)
    );
    setFilteredExpenses(update);
  }, [expenses, filters]);

  const toggleFilters = () => {
    setActiveFilters(!activeFilters);
  };

  const addFilter = (e) => {
    const { name, value } = e.target;

    if (value) {
      setFilters({ ...filters, [name]: value });
    } else {
      if (Object.prototype.hasOwnProperty.call(filters, name)) {
        const update = { ...filters };
        delete update[name];
        setFilters(update);
      }
    }
  };

  const handleDates = (e) => {
    const { name, value } = e.target;

    if (value) {
      setDateRange({ ...dateRange, [name]: convertToTimestamp(value) });
    } else {
      setDateRange({
        initDate: Date.now() - 86400000 * 35,
        endDate: Date.now(),
      });
    }
  };

  const convertToTimestamp = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getTime();
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
          {Object.entries(filters).length === 0
            ? expenses.map((item) => <ListItem key={item._id} item={item} />)
            : filteredExpenses.map((item) => (
                <ListItem key={item._id} item={item} />
              ))}
        </ul>
      </div>
      {activeFilters && (
        <FilterOptions
          toggleFilters={toggleFilters}
          addFilter={addFilter}
          filters={{ ...filters }}
          handleDates={handleDates}
          dateRange={{ ...dateRange }}
        />
      )}
    </section>
  );
}

export default ExpensesView;
