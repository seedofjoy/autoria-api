import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { SELECT_TYPE } from '../api/config';
import { fetchDependsAPIValues, fetchAverageIfSelected } from '../api/action_creators';
import {
  selectMultiValue,
  selectSingleValue,
 } from '../api/actions';
import ApiParamItem, { SelectedValueProp } from '../components/ApiParamItem';
import AverageStats, { statsShape } from '../components/AverageStats';


const apiItemShape = PropTypes.shape({
  caption: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valueItems: PropTypes.array.isRequired,
  selectedValue: SelectedValueProp,
  selectType: PropTypes.string.isRequired,
});


class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    apiItems: PropTypes.arrayOf(apiItemShape),
    averageStats: statsShape,
  }

  constructor() {
    super();
    this.getApiParamComponent = this.getApiParamComponent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    dispatch(fetchDependsAPIValues());
    dispatch(fetchAverageIfSelected());
  }

  getApiParamComponent({ name, caption, valueItems, selectType, selectedValue }) {
    const options =
      valueItems.map(v => ({ value: v.value, label: v.name }));

    const selectTypesConf = {
      [SELECT_TYPE.SINGLE]: {
        multi: false,
        onChange: this.handleParamSelect.bind(this, name),
      },
      [SELECT_TYPE.MULTI]: {
        multi: true,
        onChange: this.handleParamMultiSelect.bind(this, name),
      },
    };

    const params = selectTypesConf[selectType];
    if (!params) {
      throw new Error(`Unknown param type: ${selectType}`);
    }
    const { multi, onChange } = params;

    return (
      <ApiParamItem
        key={name}
        name={name}
        caption={caption}
        options={options}
        value={selectedValue}
        multi={multi}
        onChange={onChange}
      />
    );
  }

  handleParamSelect(name, item) {
    const value = item ? item.value : undefined;
    this.props.dispatch(selectSingleValue(name, value));
  }

  handleParamMultiSelect(name, selectedOptions) {
    const values = selectedOptions.map(({ value }) => value);
    this.props.dispatch(selectMultiValue(name, values));
  }

  render() {
    const { apiItems } = this.props;

    return (
      <div>
        <div style={{ width: '600px', verticalAlign: 'top', display: 'inline-block' }}>
          {apiItems.map(this.getApiParamComponent)}
        </div>
        <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
          {this.props.averageStats
            ? <AverageStats stats={this.props.averageStats} />
            : null
          }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { api } = state;

  const apiItems = api.params.map(({ caption, name, selectType }) => {
    const values = api.values[name] || {};
    const valueItems = values.items || [];
    const selectedValue = api.select[name];
    return {
      caption,
      name,
      selectType,
      valueItems,
      selectedValue,
    };
  });

  return {
    apiItems,
    averageStats: api.average.stats,
  };
}


export default connect(mapStateToProps)(App);
