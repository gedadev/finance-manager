import PropTypes from "prop-types";

const ListItem = ({ item, toggleModal }) => {
  return (
    <li>
      <ul className="item-data">
        {Object.entries(item).map(
          (prop) =>
            prop[0] !== "_id" && (
              <li key={prop} onClick={() => toggleModal(item)}>
                {prop[1]}
              </li>
            )
        )}
      </ul>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  toggleModal: PropTypes.func,
};

export default ListItem;
