import "../styles/settings.css";
import { UserContext } from "../ContextProvider";
import { useContext, useState } from "react";
import OptionsList from "./OptionsList";
import AddOptionModal from "./AddOptionModal";

function UserSettings() {
  const { userOptions } = useContext(UserContext);
  const [activeInput, setActiveInput] = useState(false);
  const [currentInput, setCurrentInput] = useState("");

  const toggleInput = (name) => {
    setCurrentInput(name);
    setActiveInput(!activeInput);
  };

  return (
    <section className="settings-view">
      <div className="settings-container">
        <h3>Expenses Options</h3>
        <div className="expenses-options">
          <div className="settings-item">
            <h4 className="settings-title">Pay Method:</h4>
            <OptionsList
              options={userOptions.payMethod}
              name="payMethod"
              toggleInput={toggleInput}
            />
          </div>
          <div className="settings-item">
            <h4 className="settings-title">Category:</h4>
            <OptionsList
              options={userOptions.category}
              name="category"
              toggleInput={toggleInput}
            />
          </div>
          <div className="settings-item">
            <h4 className="settings-title">Subcategory:</h4>
            <OptionsList
              options={userOptions.subcategory}
              name="subcategory"
              toggleInput={toggleInput}
            />
          </div>
        </div>
      </div>
      {activeInput && (
        <AddOptionModal name={currentInput} toggleInput={toggleInput} />
      )}
    </section>
  );
}

export default UserSettings;
