export const INVOICE_TYPES = {
  A: 'Factura A',
  B: 'Factura B',
  C: 'Factura C',
};

export const EXPENSE_CATEGORIES = {
  fuel: 'Combustible',
  maintenance: 'Mantenimiento',
  spare_parts: 'Repuestos',
  tolls: 'Peajes',
  parking: 'Estacionamiento',
  insurance: 'Seguro',
  washing: 'Lavado',
  other: 'Otro',
};

export const TRIP_STATUS = {
  active: 'Activo',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

export const INVOICE_STATUS = {
  draft: 'Borrador',
  pending: 'Pendiente',
  authorized: 'Autorizado',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
};

export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';

export const CURRENCY = 'ARS';
export const CURRENCY_SYMBOL = '$';

// AFIP Constants
export const AFIP_PRODUCTION_URL = 'https://ws.afip.gov.ar/';
export const AFIP_TESTING_URL = 'https://wswhomo.afip.gov.ar/';

// Validation
export const MIN_PASSWORD_LENGTH = 8;
export const CUIT_LENGTH = 11;
export const PHONE_REGEX = /^[0-9\-\+]{10,}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
