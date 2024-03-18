import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import axios from "axios";
import "../styles/expenses.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterOptions from "./FilterOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (dateRange.initDate > dateRange.endDate) {
      [dateRange.initDate, dateRange.endDate] = [
        dateRange.endDate,
        dateRange.initDate,
      ];
      warnInvalidDate();
    }

    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-expenses?initDate=${dateRange.initDate}&endDate=${dateRange.endDate}`
        );
        const sortedData = response.data.sort((a, b) => b.date - a.date);
        const data = sortedData.map((obj) => ({
          ...obj,
          date: new Date(obj.date).toLocaleDateString(),
        }));
        setExpenses(data);
      } catch (error) {
        toast.error("Error fetching your data");
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

  const warnInvalidDate = () =>
    toast.warn("Invalid range, dates swapped", {
      position: "bottom-right",
      autoClose: 3000,
    });

  return (
    <section id="expenses" className="expenses-view">
      <div className="filters-selector">
        <span>
          Filters:
          <FilterListIcon className="filter-btn" onClick={toggleFilters} />
        </span>
        {Object.entries(filters).length > 0 && (
          <span>
            |{" "}
            <FilterListOffIcon
              className="filter-btn"
              onClick={() => setFilters({})}
            />
          </span>
        )}
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
      <ToastContainer />
    </section>
  );
}

export default ExpensesView;
