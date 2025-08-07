const RadioButton = ({ label, name, checked, onChange, id }) => {
  return (
    <div className="cstmRadio">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
