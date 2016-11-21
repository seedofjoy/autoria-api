// Опции               options         Number[]    http://api.auto.ria.com/categories/:categoryId/options
// Тип привода         drive_id        Number      http://api.auto.ria.com/categories/:categoryId/driverTypes
// Город               city_id         Number      http://api.auto.ria.com/states/:stateId/cities
// Объем двигателя     engineVolume    Number      Number
// Пробег              raceInt         Number[]    [Min, Max]
// Количество дверей   door            Number      Number
// Грузоподъемность    carrying        Number      Number
// Количество мест     seats           Number      Number
// Взято в кредит      under_credit    Number      [1,0]
// Конфискат           confiscated_car Number      [1,0]
// Не на ходу          onRepairParts   Number      [1,0]


export const FETCH_TYPE = {
  API_CALL: 'API_CALL',
  API_CALL_DEPENDENT: 'API_CALL_DEPENDENT',
  SIMPLE_VALUE: 'SIMPLE_VALUE',
};


export const SELECT_TYPE = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
  RANGE: 'RANGE',
};


const colorParam = {
  name: 'color_id',
  caption: 'Цвет',
  fetchType: FETCH_TYPE.API_CALL,
  selectType: SELECT_TYPE.MULTI,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/colors',
  },
};
const stateParam = {
  name: 'state_id',
  caption: 'Область',
  fetchType: FETCH_TYPE.API_CALL,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/states',
  },
};
const fuelParam = {
  name: 'fuel_id',
  caption: 'Тип топлива',
  fetchType: FETCH_TYPE.API_CALL,
  selectType: SELECT_TYPE.MULTI,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/fuels',
  },
};
const mainCategoryParam = {
  name: 'main_category',
  caption: 'Тип транспорта',
  fetchType: FETCH_TYPE.API_CALL,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/categories',
    default: 1,
  },
};
const bodyParam = {
  name: 'body_id',
  caption: 'Тип кузова',
  fetchType: FETCH_TYPE.API_CALL_DEPENDENT,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/categories/:main_category/bodystyles',
    dependsOn: ['main_category'],
  },
};
const manufacturerParam = {
  name: 'marka_id',
  caption: 'Марка',
  fetchType: FETCH_TYPE.API_CALL_DEPENDENT,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/categories/:main_category/marks',
    dependsOn: ['main_category'],
  },
};
const gearboxParam = {
  name: 'gear_id',
  caption: 'Коробка передач',
  fetchType: FETCH_TYPE.API_CALL_DEPENDENT,
  selectType: SELECT_TYPE.MULTI,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/categories/:main_category/gearboxes',
    dependsOn: ['main_category'],
    // default: [2, 3, 4, 5],
  },
};
const modelParam = {
  name: 'model_id',
  caption: 'Модель',
  fetchType: FETCH_TYPE.API_CALL_DEPENDENT,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    fetchUrl: 'http://api.auto.ria.com/categories/:main_category/marks/:marka_id/models',
    dependsOn: ['main_category', 'marka_id'],
  },
};
const yearParam = {
  name: 'yers',  // OMG:(
  caption: 'Год выпуска',
  fetchType: FETCH_TYPE.SIMPLE_VALUE,
  selectType: SELECT_TYPE.RANGE,
  payload: {
    rangeFrom: 1900,
    rangeTo: new Date().getFullYear() + 1,
  },
};
const damageParam = {
  name: 'damage',
  caption: 'После ДТП',
  fetchType: FETCH_TYPE.SIMPLE_VALUE,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    values: [
      { value: 0, name: 'Небитые' },
      { value: 1, name: 'Битые' },
    ],
    default: 0,
  },
};
const customParam = {
  name: 'custom',
  caption: 'Растаможка',
  fetchType: FETCH_TYPE.SIMPLE_VALUE,
  selectType: SELECT_TYPE.SINGLE,
  payload: {
    values: [
      { value: 0, name: 'Растаможенный' },
      { value: 1, name: 'Нерастаможенный' },
    ],
    default: 0,
  },
};


export const API_PARAMETERS = [
  mainCategoryParam,
  manufacturerParam,
  modelParam,
  yearParam,
  gearboxParam,
  fuelParam,
  bodyParam,
  damageParam,
  customParam,
  // colorParam,
  // stateParam,


  // Опции               options         Number[]    http://api.auto.ria.com/categories/:categoryId/options
  // Тип привода         drive_id        Number      http://api.auto.ria.com/categories/:categoryId/driverTypes
];
