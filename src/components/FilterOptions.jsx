import { useEffect, useState } from "react";
import "../styles/filters.css";
import PropTypes from "prop-types";
import axios from "axios";
import OptionsSelector from "./OptionsSelector";

function FilterOptions({ toggleFilters }) {
  const [filtersOptions, setFiltersOptions] = useState({});

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-filters");
        const data = {
          ...response.data,
          payMethod: response.data.payMethod.map((item) => item.name),
        };
        setFiltersOptions(data);
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
          <label htmlFor="recurrent">Recurrent:</label>
          <select name="recurrent" id="recurrent">
            <option value="">None...</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="filter-option">
          <fieldset>
            <legend>Pay method:</legend>
            <OptionsSelector optionsArray={filtersOptions.payMethod} />
          </fieldset>
        </div>
        <div className="filter-option">
          <fieldset>
            <legend>Category:</legend>
            <OptionsSelector optionsArray={filtersOptions.category} />
          </fieldset>
        </div>
        <div className="filter-option">
          <fieldset>
            <legend>Subcategory:</legend>
            <OptionsSelector optionsArray={filtersOptions.subcategory} />
          </fieldset>
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
