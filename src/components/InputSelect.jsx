import propTypes from "prop-types";

function InputSelect({ inputOptions }) {
  return (
    <>
      {inputOptions ? (
        <>
          <option value="">Select...</option>
          {inputOptions.map((option) => (
            <option value={option.toLowerCase()} key={`input-${option}`}>
              {option}
            </option>
          ))}
        </>
      ) : (
        <option value="">Loading...</option>
      )}
    </>
  );
}

InputSelect.propTypes = {
  inputOptions: propTypes.array,
};

export default InputSelect;
