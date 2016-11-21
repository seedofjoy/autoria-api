import React, { PropTypes } from 'react';
import Select from 'react-select';


const OptionShape = PropTypes.shape({
  label: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
});


export default function ApiRange(props) {
  const wrapperStyle = {
    display: 'inline-block',
    width: 150,
    verticalAlign: 'middle',
  };

  return (
    <span>
      <h4>{props.caption}</h4>
      <div style={wrapperStyle}>
        <Select
          name={`from_${props.name}`}
          value={props.fromValue}
          options={props.options}
          onChange={(e) => {
            const value = e ? e.value : null;
            props.onChange([value, props.toValue]);
          }}
          placeholder="От"
          clearable={false}
        />
      </div>
      <span> - </span>
      <div style={wrapperStyle}>
        <Select
          name={`to_${props.name}`}
          value={props.toValue}
          options={props.options}
          onChange={(e) => {
            const value = e ? e.value : null;
            props.onChange([props.fromValue, value]);
          }}
          placeholder="До"
          clearable={false}
        />
      </div>
    </span>
  );
}

ApiRange.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  toValue: PropTypes.number,
  fromValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionShape).isRequired,
};
