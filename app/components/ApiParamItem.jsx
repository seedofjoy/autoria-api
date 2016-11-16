import React, { PropTypes } from 'react';
import Select from 'react-select';

// const DEFAULT_DISABLED_VALUE = 'DEFAULT_DISABLED_VALUE';

const ValueProp = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

const OptionShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: ValueProp.isRequired,
});

export function SelectedValueProp(props, propName, componentName, ...rest) {
  let checker = ValueProp;
  if (props.multi) {
    checker = PropTypes.arrayOf(checker);
  }
  return checker(props, propName, componentName, ...rest);
}

export default function ApiParamItem(props) {
  return (
    <span>
      <h4>{props.caption}</h4>
      <Select
        name={props.name}
        value={props.value}
        multi={props.multi}
        options={props.options}
        onChange={props.onChange}
      />
    </span>
  );
}

ApiParamItem.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(OptionShape).isRequired,
  multi: PropTypes.bool,
  value: SelectedValueProp,
  onChange: PropTypes.func.isRequired,
};
