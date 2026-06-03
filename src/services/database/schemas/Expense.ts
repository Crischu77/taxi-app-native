export class ExpenseSchema {
  static schema = {
    name: 'Expense',
    primaryKey: 'id',
    properties: {
      id: 'string',
      category: 'string',
      description: 'string',
      amount: 'double',
      date: 'date',
      receipt: 'string?',
      mileage: 'int?',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
