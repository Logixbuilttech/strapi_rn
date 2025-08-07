const CheckboxInput = ({ label, name, checked, onChange, id }) => {
  return (
    <div className="cstmCheckBox">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
