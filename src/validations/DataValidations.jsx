export const basicInfoStepValidations = [
  {
    field: 'license_plate',
    method: 'isLength',
    args: [{ min: 2, max: 8 }],
    validWhen: true,
    message: 'License has 8 characters.'
  },
  {
    field: 'license_plate',
    method: 'matches',
    args: ['[0-9A-Z]{2}-[0-9A-Z]{2}-[0-9A-Z]{2}', 'g'],
    validWhen: true,
    message: 'Example: XX-XX-XX'
  },
  {
    field: 'location',
    method: 'isEmpty',
    validWhen: false,
    message: 'Location is required.'
  },
  {
    field: 'vehicle_type_id',
    method: 'isEmpty',
    validWhen: false,
    message: 'Type is required.'
  },
  {
    field: 'brand',
    method: 'isEmpty',
    validWhen: false,
    message: 'Maker is required.'
  },
  {
    field: 'model',
    method: 'isEmpty',
    validWhen: false,
    message: 'Model is required.'
  },
  {
    field: 'manufacturing_year',
    method: 'isEmpty',
    validWhen: false,
    message: 'Year is required.'
  },
  {
    field: 'odometer',
    method: 'isEmpty',
    validWhen: false,
    message: 'Odometer is required.'
  }
];

export const descriptionStepValidations = [
  {
    field: 'description',
    method: 'isEmpty',
    validWhen: false,
    message: 'Description is required.'
  }
];

export const rentalInfoStepValidations = [
  {
    field: 'base_price',
    method: 'isEmpty',
    validWhen: false,
    message: 'Price is required.'
  },
  {
    field: 'pick_start_time',
    method: 'isEmpty',
    validWhen: false,
    message: 'Initial pick time is required.'
  },
  {
    field: 'pick_end_time',
    method: 'isEmpty',
    validWhen: false,
    message: 'End pick time is required.'
  },
  {
    field: 'deliver_start_time',
    method: 'isEmpty',
    validWhen: false,
    message: 'Initial deliver time is required.'
  },
  {
    field: 'deliver_end_time',
    method: 'isEmpty',
    validWhen: false,
    message: 'End deliver time is required.'
  }
];
