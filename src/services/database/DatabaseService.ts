import Realm from 'realm';
import { InvoiceSchema } from './schemas/Invoice';
import { TripSchema } from './schemas/Trip';
import { ExpenseSchema } from './schemas/Expense';
import { RemitoSchema } from './schemas/Remito';
import { UserSchema } from './schemas/User';
import { VehicleSchema } from './schemas/Vehicle';
import { Invoice, Trip, Expense, Remito } from '@/types';
import { v4 as uuidv4 } from 'uuid';

class DatabaseService {
  private realm: Realm | null = null;

  async initialize(): Promise<void> {
    try {
      this.realm = await Realm.open({
        path: 'taxiapp.realm',
        schema: [
          InvoiceSchema.schema,
          TripSchema.schema,
          ExpenseSchema.schema,
          RemitoSchema.schema,
          UserSchema.schema,
          VehicleSchema.schema,
        ],
      });
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    if (!this.realm) throw new Error('Database not initialized');

    const id = uuidv4();
    const now = new Date();

    try {
      this.realm.write(() => {
        this.realm!.create('Invoice', {
          id,
          ...invoice,
          createdAt: now,
          updatedAt: now,
        });
      });

      return { ...invoice, id, createdAt: now, updatedAt: now } as Invoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  async getInvoices(): Promise<Invoice[]> {
    if (!this.realm) throw new Error('Database not initialized');
    const invoices = this.realm.objects('Invoice').sorted('createdAt', true);
    return JSON.parse(JSON.stringify(invoices));
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    if (!this.realm) throw new Error('Database not initialized');
    const invoice = this.realm.objectForPrimaryKey('Invoice', id);
    return invoice ? JSON.parse(JSON.stringify(invoice)) : null;
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice> {
    if (!this.realm) throw new Error('Database not initialized');

    try {
      this.realm.write(() => {
        const invoice = this.realm!.objectForPrimaryKey('Invoice', id);
        if (invoice) {
          Object.assign(invoice, { ...updates, updatedAt: new Date() });
        }
      });

      const updated = await this.getInvoiceById(id);
      if (!updated) throw new Error('Invoice not found');
      return updated;
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  }

  async deleteInvoice(id: string): Promise<void> {
    if (!this.realm) throw new Error('Database not initialized');

    try {
      this.realm.write(() => {
        const invoice = this.realm!.objectForPrimaryKey('Invoice', id);
        if (invoice) {
          this.realm!.delete(invoice);
        }
      });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  }

  async createTrip(trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    if (!this.realm) throw new Error('Database not initialized');

    const id = uuidv4();
    const now = new Date();

    try {
      this.realm.write(() => {
        this.realm!.create('Trip', {
          id,
          startLatitude: trip.startLocation.latitude,
          startLongitude: trip.startLocation.longitude,
          startAddress: trip.startLocation.address,
          endLatitude: trip.endLocation?.latitude || 0,
          endLongitude: trip.endLocation?.longitude || 0,
          endAddress: trip.endLocation?.address,
          startTime: trip.startTime,
          endTime: trip.endTime,
          distance: trip.distance,
          duration: trip.duration,
          fare: trip.fare,
          status: trip.status,
          clientName: trip.clientName,
          clientPhone: trip.clientPhone,
          notes: trip.notes,
          routePoints: '[]',
          createdAt: now,
          updatedAt: now,
        });
      });

      return { ...trip, id, createdAt: now, updatedAt: now } as Trip;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }

  async getTrips(): Promise<Trip[]> {
    if (!this.realm) throw new Error('Database not initialized');
    const trips = this.realm.objects('Trip').sorted('createdAt', true);
    return JSON.parse(JSON.stringify(trips));
  }

  async getTripById(id: string): Promise<Trip | null> {
    if (!this.realm) throw new Error('Database not initialized');
    const trip = this.realm.objectForPrimaryKey('Trip', id);
    return trip ? JSON.parse(JSON.stringify(trip)) : null;
  }

  async updateTrip(id: string, updates: Partial<Trip>): Promise<Trip> {
    if (!this.realm) throw new Error('Database not initialized');

    try {
      this.realm.write(() => {
        const trip = this.realm!.objectForPrimaryKey('Trip', id);
        if (trip) {
          Object.assign(trip, { ...updates, updatedAt: new Date() });
        }
      });

      const updated = await this.getTripById(id);
      if (!updated) throw new Error('Trip not found');
      return updated;
    } catch (error) {
      console.error('Error updating trip:', error);
      throw error;
    }
  }

  async createExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense> {
    if (!this.realm) throw new Error('Database not initialized');

    const id = uuidv4();
    const now = new Date();

    try {
      this.realm.write(() => {
        this.realm!.create('Expense', {
          id,
          ...expense,
          createdAt: now,
          updatedAt: now,
        });
      });

      return { ...expense, id, createdAt: now, updatedAt: now } as Expense;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  }

  async getExpenses(): Promise<Expense[]> {
    if (!this.realm) throw new Error('Database not initialized');
    const expenses = this.realm.objects('Expense').sorted('createdAt', true);
    return JSON.parse(JSON.stringify(expenses));
  }

  async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    if (!this.realm) throw new Error('Database not initialized');
    const expenses = this.realm
      .objects('Expense')
      .filtered(`date >= $0 AND date <= $1`, startDate, endDate)
      .sorted('date', true);
    return JSON.parse(JSON.stringify(expenses));
  }

  async deleteExpense(id: string): Promise<void> {
    if (!this.realm) throw new Error('Database not initialized');

    try {
      this.realm.write(() => {
        const expense = this.realm!.objectForPrimaryKey('Expense', id);
        if (expense) {
          this.realm!.delete(expense);
        }
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }

  async createRemito(remito: Omit<Remito, 'id' | 'createdAt' | 'updatedAt'>): Promise<Remito> {
    if (!this.realm) throw new Error('Database not initialized');

    const id = uuidv4();
    const now = new Date();

    try {
      this.realm.write(() => {
        this.realm!.create('Remito', {
          id,
          ...remito,
          items: JSON.stringify(remito.items),
          createdAt: now,
          updatedAt: now,
        });
      });

      return { ...remito, id, createdAt: now, updatedAt: now } as Remito;
    } catch (error) {
      console.error('Error creating remito:', error);
      throw error;
    }
  }

  async getRemitos(): Promise<Remito[]> {
    if (!this.realm) throw new Error('Database not initialized');
    const remitos = this.realm.objects('Remito').sorted('createdAt', true);
    return JSON.parse(JSON.stringify(remitos));
  }

  async getRemitoById(id: string): Promise<Remito | null> {
    if (!this.realm) throw new Error('Database not initialized');
    const remito = this.realm.objectForPrimaryKey('Remito', id);
    return remito ? JSON.parse(JSON.stringify(remito)) : null;
  }

  async deleteRemito(id: string): Promise<void> {
    if (!this.realm) throw new Error('Database not initialized');

    try {
      this.realm.write(() => {
        const remito = this.realm!.objectForPrimaryKey('Remito', id);
        if (remito) {
          this.realm!.delete(remito);
        }
      });
    } catch (error) {
      console.error('Error deleting remito:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.realm) {
      this.realm.close();
      this.realm = null;
    }
  }
}

export default new DatabaseService();
