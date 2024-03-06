import { useEffect, useState } from "react";
import "../styles/filters.css";
import PropTypes from "prop-types";
import axios from "axios";

function FilterOptions({ toggleFilters }) {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-filters");
        const data = {
          ...response.data,
          payMethod: response.data.payMethod.map((item) => item.name),
        };
        setFilters(data);
      } catch (error) {
        console.log(`Connection error, ${error}`);
      }
    };
    getFilters();
  }, []);

  return (
    <div className="filters-modal">
      <div className="filters-container">
        <div className="filter-option">
          <label htmlFor="init-date">From:</label>
          <input type="date" name="init-date" id="init-date" />
        </div>
        <div className="filter-option">
          <label htmlFor="end-date">To:</label>
          <input type="date" name="end-date" id="end-date" />
        </div>
        <div className="filter-option">
          <label htmlFor="category">Category:</label>
          <select name="category" id="category">
            <option value="basic">Basic</option>
            <option value="other">Other</option>
            <option value="msi">MSI</option>
          </select>
        </div>
        <div className="filter-option">
          <label htmlFor="store">Store:</label>
          <select name="store" id="store">
            <option value="basic">Walmart</option>
            <option value="other">Amazon</option>
            <option value="msi">Apple</option>
          </select>
        </div>
        <button onClick={toggleFilters} className="button">
          Done
        </button>
      </div>
    </div>
  );
}

FilterOptions.propTypes = {
  toggleFilters: PropTypes.func,
};

export default FilterOptions;
