export class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      email: 'string',
      name: 'string',
      phone: 'string',
      cuit: 'string',
      profileImage: 'string?',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
