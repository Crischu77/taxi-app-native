export class VehicleSchema {
  static schema = {
    name: 'Vehicle',
    primaryKey: 'id',
    properties: {
      id: 'string',
      licensePlate: 'string',
      model: 'string',
      year: 'int',
      color: 'string',
      mileage: 'int',
      vin: 'string?',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
