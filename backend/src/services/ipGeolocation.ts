import axios from 'axios';

export interface IPGeolocationResult {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  org: string;
  timezone: string;
}

export class IPGeolocationService {
  private static readonly API_URL = 'http://ip-api.com/json';

  static async lookupIP(ip: string): Promise<IPGeolocationResult> {
    try {
      // Using free ip-api.com service
      const response = await axios.get(`${this.API_URL}/${ip}?fields=status,message,country,regionName,city,lat,lon,org,timezone`);
      
      if (response.data.status === 'fail') {
        throw new Error(response.data.message || 'IP lookup failed');
      }

      return {
        ip: ip,
        country: response.data.country,
        region: response.data.regionName,
        city: response.data.city,
        latitude: response.data.lat,
        longitude: response.data.lon,
        org: response.data.org,
        timezone: response.data.timezone
      };
    } catch (error) {
      throw new Error(`IP geolocation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async lookupCurrentIP(): Promise<IPGeolocationResult> {
    try {
      // First get current IP
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const currentIP = ipResponse.data.ip;
      
      return await this.lookupIP(currentIP);
    } catch (error) {
      throw new Error(`Failed to lookup current IP: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
