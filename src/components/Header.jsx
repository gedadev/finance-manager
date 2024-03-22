import { useState } from "react";
import EntryModal from "./EntryModal";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const [activeModal, setActiveModal] = useState(false);

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <header>
      <button className="button" onClick={toggleModal}>
        New Entry
      </button>
      <div></div>
      {activeModal && <EntryModal toggleModal={toggleModal} />}
    </header>
  );
}

export default Header;
