export class InvoiceSchema {
  static schema = {
    name: 'Invoice',
    primaryKey: 'id',
    properties: {
      id: 'string',
      invoiceNumber: 'int',
      invoiceType: 'string',
      clientName: 'string',
      clientCUIT: 'string?',
      description: 'string',
      amount: 'double',
      date: 'date',
      status: 'string',
      afipResponse: 'string?',
      cae: 'string?',
      caeExpirationDate: 'date?',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
