import "../styles/modal.css";

function EntryModal() {
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
            <option value="">Select...</option>
            <option value="cash">Cash</option>
            <option value="creditCard">Credit Card</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Category:</label>
          <select name="">
            <option value="">Select...</option>
            <option value="cash">Basic</option>
            <option value="creditCard">Other</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="">Subcategory:</label>
          <select name="">
            <option value="">Select...</option>
            <option value="groceries">Groceries</option>
            <option value="services">Services</option>
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
          <button type="submit" className="button">
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

export default EntryModal;
