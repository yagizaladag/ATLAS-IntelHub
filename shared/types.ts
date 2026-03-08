export interface Asset {
  id: string;
  name: string;
  type: 'drone' | 'node' | 'mobile_unit' | 'static_relay';
  status: 'active' | 'offline' | 'warning';
  coordinates: {
    lat: number;
    lng: number;
  };
  lastSeen: Date;
}

export interface Event {
  id: string;
  timestamp: Date;
  type: 'signal' | 'log' | 'alert' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source?: string;
}

export interface OSINTResult {
  type: 'ip_geolocation' | 'whois' | 'dns' | 'reverse_dns';
  data: any;
  timestamp: Date;
  success: boolean;
  error?: string;
}

export interface MapMarker {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'asset' | 'signal' | 'alert';
  label?: string;
  color?: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  activeConnections: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
