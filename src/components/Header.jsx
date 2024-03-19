import { useContext, useState } from "react";
import EntryModal from "./EntryModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserContext } from "../ContextProvider";

function Header() {
  const [activeModal, setActiveModal] = useState(false);
  const { performUpdate } = useContext(UserContext);

  const toggleModal = () => setActiveModal(!activeModal);

  const submitData = async (data) => {
    const toastProps = {
      position: "bottom-right",
      autoClose: 3000,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-entry",
        data
      );
      toast.success(response.data, toastProps);
      performUpdate();
    } catch (error) {
      toast.error("Error adding entry", toastProps);
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
    </header>
  );
}

export default Header;
