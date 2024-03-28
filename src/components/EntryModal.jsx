import "../styles/modal.css";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import InputSelect from "./InputSelect";
import { UserContext } from "../ContextProvider";
import { Link } from "react-router-dom";

function EntryModal({ toggleModal, action, data = null }) {
  const {
    convertToDate,
    convertToTimestamp,
    userOptions,
    submitData,
    updateData,
    deleteData,
  } = useContext(UserContext);
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

  useEffect(() => {
    if (data) {
      const date = convertToDate(new Date(data.formData.date).getTime());
      const price = Number(data.formData.price.slice(1));
      const update = { ...data.formData, date, price };

      setFormData(update);
    }
    setInputOptions(userOptions);
  }, [userOptions, data, convertToDate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      date: convertToTimestamp(formData.date),
      price: Number(formData.price),
    };

    switch (action) {
      case "add":
        submitData(newData);
        break;
      case "update":
        updateData(newData, data._id);
        break;
      default:
        break;
    }
    toggleModal();
  };

  const handleDelete = () => {
    deleteData(data._id);
    toggleModal();
  };

  return (
    <div className="entry-modal">
      <form action="" className="entry-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="modal-date">Date:</label>
          <input
            type="date"
            name="date"
            id="modal-date"
            onChange={handleInput}
            value={formData.date}
          />
        </div>
        <div className="input-container">
          <label htmlFor="modal-pay">Pay Method:</label>
          <select
            name="payMethod"
            id="modal-pay"
            onChange={handleInput}
            value={formData.payMethod}
          >
            <InputSelect inputOptions={inputOptions.payMethod} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="modal-category">Category:</label>
          <select
            name="category"
            id="modal-category"
            onChange={handleInput}
            value={formData.category}
          >
            <InputSelect inputOptions={inputOptions.category} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="modal-subcategory">Subcategory:</label>
          <select
            name="subcategory"
            id="modal-subcategory"
            onChange={handleInput}
            value={formData.subcategory}
          >
            <InputSelect inputOptions={inputOptions.subcategory} />
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="modal-recurrent">Recurrent:</label>
          <select
            name="recurrent"
            id="modal-recurrent"
            onChange={handleInput}
            value={formData.recurrent}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="modal-store">Store:</label>
          <input
            type="text"
            name="store"
            id="modal-store"
            onChange={handleInput}
            value={formData.store}
          />
        </div>
        <div className="input-container">
          <label htmlFor="modal-item">Item:</label>
          <input
            type="text"
            name="item"
            id="modal-item"
            onChange={handleInput}
            value={formData.item}
          />
        </div>
        <div className="input-container">
          <label htmlFor="modal-price">Price:</label>
          <input
            type="number"
            name="price"
            id="modal-price"
            onChange={handleInput}
            value={formData.price}
          />
        </div>
        <div className="form-buttons">
          {action === "add" && (
            <button type="submit" className="button" disabled={submitDisabled}>
              Add Entry
            </button>
          )}
          {action === "update" && (
            <button type="submit" className="button" disabled={submitDisabled}>
              Update Entry
            </button>
          )}
          <button type="button" className="button" onClick={toggleModal}>
            Discard
          </button>
          <Link to="settings">
            <button type="button" className="button" onClick={toggleModal}>
              Manage
            </button>
          </Link>
          {action === "update" && (
            <button
              type="button"
              className="button delete-button"
              onClick={handleDelete}
            >
              Delete Entry
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

EntryModal.propTypes = {
  toggleModal: PropTypes.func,
  action: PropTypes.string,
  data: PropTypes.object,
};

export default EntryModal;
