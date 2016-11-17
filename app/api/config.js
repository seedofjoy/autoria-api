// Цвет                color_id        Number      http://api.auto.ria.com/colors
// Область             state_id        Number      http://api.auto.ria.com/states
// Тип топлива         fuel_id         Number[]    http://api.auto.ria.com/fuels
// Тип транспорта      main_category   Number      http://api.auto.ria.com/categories

// Тип кузова          body_id         Number      http://api.auto.ria.com/categories/:categoryId/bodystyles
// Марка               marka_id        Number      http://api.auto.ria.com/categories/:categoryId/marks
// Коробка передач     gear_id         Number[]    http://api.auto.ria.com/categories/:categoryId/gearboxes
// Опции               options         Number[]    http://api.auto.ria.com/categories/:categoryId/options
// Тип привода         drive_id        Number      http://api.auto.ria.com/categories/:categoryId/driverTypes

// Модель              model_id        Number      http://api.auto.ria.com/categories/:categoryId/marks/:markId/models
// Город               city_id         Number      http://api.auto.ria.com/states/:stateId/cities

// Год выпуска         yers            Number[]
// Объем двигателя     engineVolume    Number      Number
// Пробег              raceInt         Number[]    [Min, Max]
// Количество дверей   door            Number      Number
// Грузоподъемность    carrying        Number      Number
// Количество мест     seats           Number      Number
// Растаможка          custom          Number      [1,0]
// После ДТП           damage          Number      [1,0]
// Взято в кредит      under_credit    Number      [1,0]
// Конфискат           confiscated_car Number      [1,0]
// Не на ходу          onRepairParts   Number      [1,0]


export const FETCH_TYPE = {
  API_CALL: 'API_CALL',
  API_CALL_DEPENDENT: 'API_CALL_DEPENDENT',
};


export const SELECT_TYPE = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
};


export const API_PARAMETERS = [
  {
    name: 'color_id',
    caption: 'Цвет',
    fetchType: FETCH_TYPE.API_CALL,
    selectType: SELECT_TYPE.SINGLE,
    payload: {
      fetchUrl: 'http://api.auto.ria.com/colors',
    },
  },
  {
    name: 'state_id',
    caption: 'Область',
    fetchType: FETCH_TYPE.API_CALL,
    selectType: SELECT_TYPE.SINGLE,
    payload: {
      fetchUrl: 'http://api.auto.ria.com/states',
    },
  },
  {
    name: 'fuel_id',
    caption: 'Тип топлива',
    fetchType: FETCH_TYPE.API_CALL,
    selectType: SELECT_TYPE.MULTI,
    payload: {
      fetchUrl: 'http://api.auto.ria.com/fuels',
    },
  },
  {
    name: 'main_category',
    caption: 'Тип транспорта',
    fetchType: FETCH_TYPE.API_CALL,
    selectType: SELECT_TYPE.SINGLE,
    payload: {
      fetchUrl: 'http://api.auto.ria.com/categories',
    },
  },
  {
    name: 'body_id',
    caption: 'Тип кузова',
    fetchType: FETCH_TYPE.API_CALL_DEPENDENT,
    selectType: SELECT_TYPE.SINGLE,
    payload: {
      fetchUrl: 'http://api.auto.ria.com/categories/:main_category/bodystyles',
      dependsOn: ['main_category'],
    },
  },

  // Тип кузова          body_id         Number      http://api.auto.ria.com/categories/:categoryId/bodystyles
  // Марка               marka_id        Number      http://api.auto.ria.com/categories/:categoryId/marks
  // Коробка передач     gear_id         Number[]    http://api.auto.ria.com/categories/:categoryId/gearboxes
  // Опции               options         Number[]    http://api.auto.ria.com/categories/:categoryId/options
  // Тип привода         drive_id        Number      http://api.auto.ria.com/categories/:categoryId/driverTypes
];
