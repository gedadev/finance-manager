import "../styles/modal.css";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import InputSelect from "./InputSelect";

function EntryModal({ toggleModal, toast }) {
  // move this function to context as is shared with FilterOptions
  const convertToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  };

  // move function to context, is shared with ExpensesView
  const convertToTimestamp = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getTime();
  };

  const [inputOptions, setInputOptions] = useState({});
  const [formData, setFormData] = useState({
    date: convertToDate(Date.now()),
    payMethod: "",
    category: "",
    subcategory: "",
    recurrent: "no",
    store: "",
    item: "",
    price: null,
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);

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

  useEffect(() => {
    const filledForm = Object.values(formData).reduce(
      (acc, value) => String(value).trim() !== "" && acc,
      true
    );

    if (filledForm) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const update = { ...formData, [name]: value };
    setFormData(update);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, date: convertToTimestamp(formData.date) };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-entry",
        data
      );
      toast.success(response.data, {
        position: "bottom-right",
        autoClose: 3000,
      });
      toggleModal();
    } catch (error) {
      toast.error("Error adding entry", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="entry-modal">
      <form action="" className="entry-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="">Date:</label>
          <input
            type="date"
            name="date"
            id=""
            onChange={handleInput}
            value={formData.date}
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Pay Method:</label>
          <select name="payMethod" onChange={handleInput}>
            <InputSelect inputOptions={inputOptions.payMethod} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Category:</label>
          <select name="category" onChange={handleInput}>
            <InputSelect inputOptions={inputOptions.category} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Subcategory:</label>
          <select name="subcategory" onChange={handleInput}>
            <InputSelect inputOptions={inputOptions.subcategory} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Recurrent:</label>
          <select
            name="recurrent"
            onChange={handleInput}
            value={formData.recurrent}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Store:</label>
          <input
            type="text"
            name="store"
            id=""
            onChange={handleInput}
            value={formData.store}
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Item:</label>
          <input
            type="text"
            name="item"
            id=""
            onChange={handleInput}
            value={formData.item}
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Price:</label>
          <input
            type="number"
            name="price"
            id=""
            onChange={handleInput}
            value={formData.price}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="button" disabled={submitDisabled}>
            Add Entry
          </button>
          <button type="button" className="button" onClick={toggleModal}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

EntryModal.propTypes = {
  toggleModal: propTypes.func,
  toast: propTypes.func,
};

export default EntryModal;
