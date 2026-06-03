import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

class LocationService {
  private watchId: number | null = null;
  private currentLocation: LocationObject | null = null;

  async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async checkPermission(): Promise<boolean> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<LocationObject | null> {
    try {
      const hasPermission = await this.checkPermission();
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      this.currentLocation = location;
      return location;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  async startLocationTracking(
    onLocationChange: (location: LocationObject) => void
  ): Promise<number | null> {
    try {
      const hasPermission = await this.checkPermission();
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      this.watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          this.currentLocation = location;
          onLocationChange(location);
        }
      );

      return this.watchId;
    } catch (error) {
      console.error('Error starting location tracking:', error);
      return null;
    }
  }

  async stopLocationTracking(): Promise<void> {
    try {
      if (this.watchId) {
        const subscription = await Location.watchPositionAsync({}, () => {});
        subscription.remove();
        this.watchId = null;
      }
    } catch (error) {
      console.error('Error stopping location tracking:', error);
    }
  }

  async getAddressFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<string | null> {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];
        return `${address.street || ''} ${address.city || ''}, ${address.region || ''}`;
      }

      return null;
    } catch (error) {
      console.error('Error getting address from coordinates:', error);
      return null;
    }
  }

  getCurrentLocationSync(): LocationObject | null {
    return this.currentLocation;
  }
}

export default new LocationService();
