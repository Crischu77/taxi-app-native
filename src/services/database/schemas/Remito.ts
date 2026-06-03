export class RemitoSchema {
  static schema = {
    name: 'Remito',
    primaryKey: 'id',
    properties: {
      id: 'string',
      remitoNumber: 'int',
      clientName: 'string',
      description: 'string',
      items: 'string',
      status: 'string',
      date: 'date',
      invoiceId: 'string?',
      totalAmount: 'double',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
