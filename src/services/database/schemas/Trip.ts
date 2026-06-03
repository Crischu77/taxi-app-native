export class TripSchema {
  static schema = {
    name: 'Trip',
    primaryKey: 'id',
    properties: {
      id: 'string',
      startLatitude: 'double',
      startLongitude: 'double',
      startAddress: 'string?',
      endLatitude: 'double?',
      endLongitude: 'double?',
      endAddress: 'string?',
      startTime: 'date',
      endTime: 'date?',
      distance: 'double',
      duration: 'int',
      fare: 'double',
      status: 'string',
      clientName: 'string?',
      clientPhone: 'string?',
      notes: 'string?',
      routePoints: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
