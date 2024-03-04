import PropTypes from "prop-types";

const ListItem = ({ item }) => {
  return (
    <li>
      <ul className="item-data">
        {Object.entries(item).map(
          (prop) => prop[0] !== "_id" && <li key={prop}>{prop[1]}</li>
        )}
      </ul>
    </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
};

export default ListItem;
