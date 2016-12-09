import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import * as actions from '../actions';
import { loadAPI } from '../actions';
import { SELECT_TYPE } from '../api/config';
// import {
//   selectMultiValue,
//   selectSingleValue,
//   selectRangeValue,
//  } from '../api/actions';
import ApiParamItem, { SelectedValueProp } from '../components/ApiParamItem';
import AverageStats, { statsShape } from '../components/AverageStats';
import ApiRange from '../components/ApiRange';


const apiItemShape = PropTypes.shape({
  caption: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valueItems: PropTypes.array.isRequired,
  selectedValue: SelectedValueProp,
  selectType: PropTypes.string.isRequired,
});


class App extends Component {

  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    // apiItems: PropTypes.arrayOf(apiItemShape),
    // averageStats: statsShape,
  }

  constructor() {
    super();
    this.getApiParamComponent = this.getApiParamComponent.bind(this);
  }

  componentWillMount() {
    this.props.loadAPI();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    dispatch(fetchAverageIfSelected());
  }

  getApiSelectComponent({ name, caption, valueItems, selectType, selectedValue }) {
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

  getApiRangeComponent({ name, caption, selectedValue, payload }) {
    const options = _
      .range(payload.rangeTo, payload.rangeFrom - 1)
      .map(i => ({ value: i, label: i }));
    const onChange = this.handleRangeSelect.bind(this, name);
    const [fromValue, toValue] = selectedValue || [];

    return (
      <ApiRange
        key={name}
        name={name}
        caption={caption}
        options={options}
        fromValue={fromValue}
        toValue={toValue}
        onChange={onChange}
      />
    );
  }

  getApiParamComponent(apiItem) {
    switch (apiItem.selectType) {
      case SELECT_TYPE.SINGLE:
      case SELECT_TYPE.MULTI:
        return this.getApiSelectComponent(apiItem);

      case SELECT_TYPE.RANGE:
        return this.getApiRangeComponent(apiItem);

      default:
        throw new Error(`Unknown param type: ${apiItem.selectType}`);
    }
  }

  handleParamSelect(name, item) {
    const value = item ? item.value : undefined;
    // this.props.dispatch(selectSingleValue(name, value));
  }

  handleParamMultiSelect(name, selectedOptions) {
    const values = selectedOptions.map(({ value }) => value);
    // this.props.dispatch(selectMultiValue(name, values));
  }

  handleRangeSelect(name, [from, to]) {
    // this.props.dispatch(selectRangeValue(name, { from, to }));
  }

  render() {
    const apiItems = [];
    // const { apiItems } = this.props;

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
  // const { api } = state;

  // const apiItems = api.params.map(({ caption, name, selectType, payload }) => {
  //   const values = api.values[name] || {};
  //   const valueItems = values.items || [];
  //   const selectedValue = api.select[name];
  //   return {
  //     caption,
  //     name,
  //     selectType,
  //     valueItems,
  //     selectedValue,
  //     payload,
  //   };
  // });

  return {
    // apiItems,
    // averageStats: api.average.stats,
  };
}


export default connect(mapStateToProps, { loadAPI })(App);
