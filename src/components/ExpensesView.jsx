import { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
import "../styles/expenses.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterOptions from "./FilterOptions";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../ContextProvider";
import EntryModal from "./EntryModal";

function ExpensesView() {
  const [activeFilters, setActiveFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const { expenses } = useContext(UserContext);
  const [activeModal, setActiveModal] = useState(false);

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

  const toggleFilters = () => setActiveFilters(!activeFilters);

  const toggleModal = () => setActiveModal(!activeModal);

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

  return (
    <section id="expenses" className="expenses-view">
      <div className="filters-selector">
        <span>
          Filters:
          <FilterListIcon className="filter-btn" onClick={toggleFilters} />
        </span>
        {Object.entries(filters).length > 0 && (
          <span>
            |
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
            ? expenses.map((item) => (
                <ListItem
                  key={item._id}
                  item={item}
                  toggleModal={toggleModal}
                />
              ))
            : filteredExpenses.map((item) => (
                <ListItem
                  key={item._id}
                  item={item}
                  toggleModal={toggleModal}
                />
              ))}
        </ul>
      </div>
      {activeFilters && (
        <FilterOptions
          toggleFilters={toggleFilters}
          addFilter={addFilter}
          filters={{ ...filters }}
        />
      )}
      {activeModal && <EntryModal toggleModal={toggleModal} action="update" />}
    </section>
  );
}

export default ExpensesView;
