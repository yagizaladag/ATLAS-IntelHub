import { create } from 'zustand';
import { Asset, Event, MapMarker, SystemMetrics, Coordinates } from '../../../shared/types';

interface AppState {
  // Map state
  markers: MapMarker[];
  selectedMarker: MapMarker | null;
  mouseCoordinates: Coordinates;
  setMarkers: (markers: MapMarker[]) => void;
  addMarker: (marker: MapMarker) => void;
  setSelectedMarker: (marker: MapMarker | null) => void;
  setMouseCoordinates: (coords: Coordinates) => void;

  // Assets
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  addAsset: (asset: Asset) => void;

  // Events
  events: Event[];
  addEvent: (event: Event) => void;
  setEvents: (events: Event[]) => void;

  // System metrics
  metrics: SystemMetrics;
  setMetrics: (metrics: SystemMetrics) => void;

  // UI state
  currentTime: Date;
  setCurrentTime: (time: Date) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Map state
  markers: [],
  selectedMarker: null,
  mouseCoordinates: { lat: 0, lng: 0 },
  setMarkers: (markers) => set({ markers }),
  addMarker: (marker) => set(state => ({ markers: [...state.markers, marker] })),
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  setMouseCoordinates: (coords) => set({ mouseCoordinates: coords }),

  // Assets
  assets: [],
  setAssets: (assets) => set({ assets }),
  updateAsset: (id, updates) => set(state => ({
    assets: state.assets.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    )
  })),
  addAsset: (asset) => set(state => ({ assets: [...state.assets, asset] })),

  // Events
  events: [],
  addEvent: (event) => set(state => ({ events: [event, ...state.events].slice(0, 100) })),
  setEvents: (events) => set({ events }),

  // System metrics
  metrics: {
    cpu: 0,
    memory: 0,
    network: 0,
    activeConnections: 0,
  },
  setMetrics: (metrics) => set({ metrics }),

  // UI state
  currentTime: new Date(),
  setCurrentTime: (time) => set({ currentTime: time }),
}));
