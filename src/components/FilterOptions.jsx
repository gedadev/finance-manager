import { useEffect, useState } from "react";
import "../styles/filters.css";
import PropTypes from "prop-types";
import axios from "axios";
import OptionsSelector from "./OptionsSelector";

function FilterOptions({ toggleFilters, addFilter, filters }) {
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

  const handleFieldset = (e) => {
    const fieldset = e.target.closest("fieldset");
    const options = fieldset.querySelectorAll('input[type="checkbox"]');
    const selectedOptions = [...options].filter((option) => option.checked);
    const filterValues = {
      target: {
        name: fieldset.name,
        value:
          selectedOptions.length > 0
            ? selectedOptions.map((option) => option.name)
            : "",
      },
    };

    addFilter(filterValues);
  };

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
          <select
            name="recurrent"
            value={filters.recurrent}
            id="recurrent"
            onChange={addFilter}
          >
            <option value="">None...</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="filter-option">
          <fieldset name="payMethod" onChange={handleFieldset}>
            <legend>Pay method:</legend>
            <OptionsSelector
              optionsArray={filtersOptions.payMethod}
              filterName={"payMethod"}
              filters={filters}
            />
          </fieldset>
        </div>
        <div className="filter-option">
          <fieldset name="category" onChange={handleFieldset}>
            <legend>Category:</legend>
            <OptionsSelector
              optionsArray={filtersOptions.category}
              filterName={"category"}
              filters={filters}
            />
          </fieldset>
        </div>
        <div className="filter-option">
          <fieldset name="subcategory" onChange={handleFieldset}>
            <legend>Subcategory:</legend>
            <OptionsSelector
              optionsArray={filtersOptions.subcategory}
              filterName={"subcategory"}
              filters={filters}
            />
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
  addFilter: PropTypes.func,
  filters: PropTypes.object,
};

export default FilterOptions;
