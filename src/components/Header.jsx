import { useState } from "react";
import EntryModal from "./EntryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Header() {
  const [activeModal, setActiveModal] = useState(false);

  const toggleModal = () => setActiveModal(!activeModal);

  const submitData = async (data) => {
    const toastProps = {
      position: "bottom-right",
      autoClose: 3000,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-entrya",
        data
      );
      toast.success(response.data, toastProps);
    } catch (error) {
      toast.error("Error adding entry", toastProps);
      return false;
    }
  };

  return (
    <header>
      <button className="button" onClick={toggleModal}>
        New Entry
      </button>
      <div></div>
      {activeModal && (
        <EntryModal toggleModal={toggleModal} submitData={submitData} />
      )}
      <ToastContainer />
    </header>
  );
}

export default Header;
