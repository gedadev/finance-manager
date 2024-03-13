import "../styles/modal.css";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import InputSelect from "./InputSelect";

function EntryModal({ toggleModal }) {
  const [inputOptions, setInputOptions] = useState({});

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-filters");
        const data = {
          ...response.data,
          payMethod: response.data.payMethod.map((item) => item.name),
        };
        setInputOptions(data);
      } catch (error) {
        console.log(`Connection error, ${error}`);
      }
    };
    getFilters();
  }, []);

  return (
    <div className="entry-modal">
      <form action="" className="entry-form">
        <div className="input-container">
          <label htmlFor="">Date:</label>
          <input type="date" name="" id="" />
        </div>
        <div className="input-container">
          <label htmlFor="">Pay Method:</label>
          <select name="">
            <InputSelect inputOptions={inputOptions.payMethod} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Category:</label>
          <select name="">
            <InputSelect inputOptions={inputOptions.category} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Subcategory:</label>
          <select name="">
            <InputSelect inputOptions={inputOptions.subcategory} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Recurrent:</label>
          <select name="">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Store:</label>
          <input type="text" name="" id="" />
        </div>
        <div className="input-container">
          <label htmlFor="">Item:</label>
          <input type="text" name="" id="" />
        </div>
        <div className="input-container">
          <label htmlFor="">Price:</label>
          <input type="number" name="" id="" />
        </div>
        <div className="form-buttons">
          <button type="submit" className="button">
            Add Entry
          </button>
          <button type="submit" className="button" onClick={toggleModal}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

EntryModal.propTypes = {
  toggleModal: propTypes.func,
};

export default EntryModal;
