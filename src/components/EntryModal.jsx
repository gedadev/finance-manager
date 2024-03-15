import "../styles/modal.css";
import propTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import InputSelect from "./InputSelect";
import { UserContext } from "../ContextProvider";

function EntryModal({ toggleModal, toast }) {
  const { convertToDate, convertToTimestamp, userOptions } =
    useContext(UserContext);
  const [inputOptions, setInputOptions] = useState({});
  const [formData, setFormData] = useState({
    date: convertToDate(Date.now()),
    payMethod: "",
    category: "",
    subcategory: "",
    recurrent: "no",
    store: "",
    item: "",
    price: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => setInputOptions(userOptions), [userOptions]);

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
    const data = {
      ...formData,
      date: convertToTimestamp(formData.date),
      price: Number(formData.price),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-entry",
        data
      );
      // toast is executing when the component umount, so its undefined
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
