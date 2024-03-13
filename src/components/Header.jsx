import { useState } from "react";
import EntryModal from "./EntryModal";

function Header() {
  const [activeModal, setActiveModal] = useState(false);

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <header>
      <button className="button" onClick={toggleModal}>
        New Entry
      </button>
      <div></div>
      {activeModal && <EntryModal />}
    </header>
  );
}

export default Header;
