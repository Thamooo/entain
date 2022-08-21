import ReactSelect from "react-select";
import { SelectComponentProps } from "../../types/components/inputs/Select";
import "./../../scss/components/parts/Select.scss";

export const Index: React.FC<SelectComponentProps> = ({ value, isMulti = false, name, callback, options, className, placeholder }) => {
  //Needed to erase all of the initial styles
  const styleProxy = new Proxy(
    {},
    {
      get: (target, propKey) => () => {},
    }
  );

  return (
    <div className="select">
      <div className="select__title">{name}</div>
      <ReactSelect
        onChange={(change) => {
          callback(change);
        }}
        placeholder={placeholder}
        styles={styleProxy}
        classNamePrefix={"select"}
        className={`select__holder select__holder__${className}`}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        options={options}
        menuIsOpen={true}
        isSearchable={false}
        isMulti={isMulti}
        hideSelectedOptions={false}
        value={value}
        captureMenuScroll={false}
      />
    </div>
  );
};

export default Index;
