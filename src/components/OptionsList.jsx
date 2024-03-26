import PropTypes from "prop-types";
import AddBoxIcon from "@mui/icons-material/AddBox";

const OptionsList = ({ options, name, toggleInput }) => {
  return (
    <ul>
      {options ? (
        <>
          {options.map((item) => (
            <li key={`${name}-${item}`}>{`${item},`}</li>
          ))}
          <li>
            <AddBoxIcon
              className="add-icon"
              onClick={() => toggleInput(name)}
            />
          </li>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

OptionsList.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  toggleInput: PropTypes.func,
};

export default OptionsList;
