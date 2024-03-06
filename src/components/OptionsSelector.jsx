import PropTypes from "prop-types";

function OptionsSelector({ optionsArray }) {
  return (
    <>
      {optionsArray ? (
        optionsArray.map((item) => (
          <div className="option-item" key={item}>
            <input
              type="checkbox"
              name={item.toLowerCase()}
              id={item.toLowerCase()}
            />
            <label htmlFor={item.toLowerCase()}>{item}</label>
          </div>
        ))
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

OptionsSelector.propTypes = {
  optionsArray: PropTypes.array,
};

export default OptionsSelector;
