import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "../ContextProvider";

function AddOptionModal({ name, toggleInput }) {
  const [inputValue, setInputValue] = useState("");
  const { addUserOption } = useContext(UserContext);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserOption(name, inputValue);
    toggleInput("");
  };

  return (
    <div className="option-modal">
      <form className="option-form" onSubmit={handleSubmit}>
        <label htmlFor="new">New:</label>
        <input
          type="text"
          id="new"
          className="new"
          value={inputValue}
          onChange={handleInput}
        />
        <button type="submit" className="button light-btn">
          Add
        </button>
        <button
          type="button"
          className="button light-btn"
          onClick={() => toggleInput("")}
        >
          Discard
        </button>
      </form>
    </div>
  );
}

AddOptionModal.propTypes = {
  name: PropTypes.string,
  toggleInput: PropTypes.func,
};

export default AddOptionModal;
