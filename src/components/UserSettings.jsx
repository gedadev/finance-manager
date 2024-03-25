import "../styles/settings.css";
import { UserContext } from "../ContextProvider";
import { useContext } from "react";
import OptionsList from "./OptionsList";

function UserSettings() {
  const { userOptions } = useContext(UserContext);

  return (
    <section className="settings-view">
      <div className="settings-container">
        <h3>Expenses Options</h3>
        <div className="expenses-options">
          <div className="settings-item">
            <h4 className="settings-title">Pay Method:</h4>
            <OptionsList options={userOptions.payMethod} name="payMethod" />
          </div>
          <div className="settings-item">
            <h4 className="settings-title">Category:</h4>
            <OptionsList options={userOptions.category} name="category" />
          </div>
          <div className="settings-item">
            <h4 className="settings-title">Subcategory:</h4>
            <OptionsList options={userOptions.subcategory} name="subcategory" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSettings;
