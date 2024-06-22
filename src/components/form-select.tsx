import Select from "react-select";

type Props = {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: any;
  selectRef?: any;
  onChange?: any;
  readOnly?: any;
  isMulti?: boolean;
  options: any;
  errorMessage?: any;
};

const FormSelect = ({
  type,
  name,
  label,
  placeholder,
  defaultValue,
  selectRef,
  onChange,
  readOnly,
  isMulti,
  options,
  errorMessage,
  ...rest
}: Props) => (
  <div className="form_group_container">
    {type === "default" ? (
      <div className="form-group">
        {label && <label>{label}</label>}
        <select
          name={name}
          className="form-control"
          defaultValue={defaultValue}
          onChange={onChange}
          {...selectRef}
          {...rest}
        >
          {options?.map((option: any, i: any) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    ) : (
      <div className="form-group">
        {label && <label>{label}</label>}
        <Select
          classNamePrefix="select_container"
          value={defaultValue}
          options={options}
          onChange={onChange}
          isDisabled={readOnly}
          placeholder={placeholder}
          isMulti={isMulti}
          {...rest}
        />
      </div>
    )}
    {errorMessage && <span>* {errorMessage}</span>}
  </div>
);

export default FormSelect;
