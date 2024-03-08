import PropTypes from "prop-types";

function OptionsSelector({ optionsArray, filterName, filters }) {
  return (
    <>
      {optionsArray ? (
        optionsArray.map((item) => (
          <div className="option-item" key={`${filterName}-${item}`}>
            <input
              type="checkbox"
              name={item.toLowerCase()}
              id={item.toLowerCase()}
              defaultChecked={
                filters[filterName] &&
                filters[filterName].includes(item.toLowerCase())
                  ? true
                  : false
              }
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
  filterName: PropTypes.string,
  filters: PropTypes.object,
};

export default OptionsSelector;
