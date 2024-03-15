import { useContext, useEffect, useState } from "react";
import "../styles/filters.css";
import PropTypes from "prop-types";
import OptionsSelector from "./OptionsSelector";
import { UserContext } from "../ContextProvider";

function FilterOptions({
  toggleFilters,
  addFilter,
  filters,
  handleDates,
  dateRange,
}) {
  const { userOptions } = useContext(UserContext);
  const [filtersOptions, setFiltersOptions] = useState({});

  useEffect(() => setFiltersOptions(userOptions), [userOptions]);

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

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="filters-modal">
      <div className="filters-container">
        <div className="filter-option">
          <label htmlFor="init-date">From:</label>
          <input
            type="date"
            name="initDate"
            id="init-date"
            value={convertToDate(dateRange.initDate)}
            onChange={handleDates}
          />
        </div>
        <div className="filter-option">
          <label htmlFor="end-date">To:</label>
          <input
            type="date"
            name="endDate"
            id="end-date"
            value={convertToDate(dateRange.endDate)}
            onChange={handleDates}
          />
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
  handleDates: PropTypes.func,
  dateRange: PropTypes.object,
};

export default FilterOptions;
