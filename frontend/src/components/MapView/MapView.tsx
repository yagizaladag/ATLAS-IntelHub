'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAppStore } from '@/store/useAppStore';

// You'll need to set this in your environment variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { markers, addMarker, setMouseCoordinates, addAsset, addEvent } = useAppStore();

  const generateID = () => Math.random().toString(36).substr(2, 9);

  const createMarker = (lng: number, lat: number, type: 'asset' | 'signal' | 'alert', label: string, color: string) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = color;
    el.style.width = '12px';
    el.style.height = '12px';
    el.style.borderRadius = '50%';
    el.style.border = '2px solid #fff';
    el.style.boxShadow = `0 0 15px ${color}`;
    el.style.cursor = 'pointer';
    el.style.transition = 'all 0.3s ease';

    // Add hover effect
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.2)';
      el.style.zIndex = '1000';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
      el.style.zIndex = 'auto';
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map.current!);

    // Create popup with tactical intel
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      className: 'tactical-popup'
    }).setHTML(`
      <div style="background: #0a1414; color: #0df2f2; padding: 12px; border-radius: 4px; font-family: 'Space Grotesk', monospace; font-size: 10px; border: 1px solid #1a2e2e; min-width: 200px;">
        <div style="font-weight: bold; margin-bottom: 8px; color: #0df2f2; text-transform: uppercase; letter-spacing: 1px;">${label}</div>
        <div style="margin-bottom: 4px;"><span style="color: #4a7070;">TYPE:</span> <span style="color: #fff;">${type.toUpperCase()}</span></div>
        <div style="margin-bottom: 4px;"><span style="color: #4a7070;">LAT:</span> <span style="color: #fff;">${lat.toFixed(6)}</span></div>
        <div style="margin-bottom: 4px;"><span style="color: #4a7070;">LNG:</span> <span style="color: #fff;">${lng.toFixed(6)}</span></div>
        <div style="margin-bottom: 4px;"><span style="color: #4a7070;">STATUS:</span> <span style="color: #0df2f2;">ACTIVE</span></div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #1a2e2e;">
          <div style="color: #4a7070; font-size: 8px;">LAST SEEN: ${new Date().toISOString()}</div>
        </div>
      </div>
    `);

    marker.setPopup(popup);
    markersRef.current.push(marker);

    return marker;
  };

  const updateHUDCoordinates = (lat: number, lng: number) => {
    setMouseCoordinates({ lat, lng });
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize real Mapbox map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 2,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
      attributionControl: false
    });

    map.current.on('load', () => {
      // Add navigation control
      map.current!.addControl(new mapboxgl.NavigationControl({
        showCompass: false,
        showZoom: true
      }), 'top-right');
      
      // Add scale control
      map.current!.addControl(new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      }), 'bottom-left');

      // Add initial markers for demo
      const initialMarkers = [
        {
          id: 'asset-1',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          type: 'asset' as const,
          label: 'MOBILE_UNIT_A',
          color: '#0df2f2'
        },
        {
          id: 'signal-1',
          coordinates: { lat: 51.5074, lng: -0.1278 },
          type: 'signal' as const,
          label: 'SIGNAL_SOURCE_01',
          color: '#ef4444'
        },
        {
          id: 'alert-1',
          coordinates: { lat: 35.6895, lng: 139.6917 },
          type: 'alert' as const,
          label: 'ALERT_ZONE_TOKYO',
          color: '#f59e0b'
        },
        {
          id: 'asset-2',
          coordinates: { lat: -33.8688, lng: 151.2093 },
          type: 'asset' as const,
          label: 'DRONE_UNIT_SYDNEY',
          color: '#0df2f2'
        }
      ];

      initialMarkers.forEach(markerData => {
        createMarker(
          markerData.coordinates.lng, 
          markerData.coordinates.lat, 
          markerData.type, 
          markerData.label, 
          markerData.color
        );
        
        // Add to store
        addMarker(markerData);
        
        // Add to asset tracking
        addAsset({
          id: markerData.id,
          name: markerData.label,
          type: markerData.type === 'asset' ? 'mobile_unit' : 'node',
          status: 'active',
          coordinates: markerData.coordinates,
          lastSeen: new Date()
        });
      });

      // Add connection lines between assets
      if (map.current!.getSource('connections')) return;
      
      map.current!.addSource('connections', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [-74.0060, 40.7128], // New York
                  [-0.1278, 51.5074]  // London
                ]
              },
              properties: {
                color: '#0df2f2',
                opacity: 0.6
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [139.6917, 35.6895], // Tokyo
                  [151.2093, -33.8688] // Sydney
                ]
              },
              properties: {
                color: '#ef4444',
                opacity: 0.4
              }
            }
          ]
        }
      });

      map.current!.addLayer({
        id: 'connection-lines',
        type: 'line',
        source: 'connections',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2,
          'line-opacity': ['get', 'opacity'],
          'line-dasharray': [2, 2]
        }
      });
    });

    // Handle real mouse movement for coordinates
    map.current.on('mousemove', (e) => {
      updateHUDCoordinates(e.lngLat.lat, e.lngLat.lng);
    });

    // Handle real click events - THIS IS THE CORE FUNCTIONALITY
    map.current.on('click', (e) => {
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      
      // Update HUD coordinates
      updateHUDCoordinates(lat, lng);
      
      // Create marker on click location
      const markerId = generateID();
      const markerLabel = `TARGET_${markerId.toUpperCase()}`;
      const marker = createMarker(lng, lat, 'signal', markerLabel, '#ef4444');
      
      // Add marker to store
      addMarker({
        id: markerId,
        coordinates: { lat, lng },
        type: 'signal',
        label: markerLabel,
        color: '#ef4444'
      });
      
      // Add asset to tracking list
      addAsset({
        id: markerId,
        name: markerLabel,
        type: 'node',
        status: 'active',
        coordinates: { lat, lng },
        lastSeen: new Date()
      });
      
      // Add event to feed
      addEvent({
        id: generateID(),
        timestamp: new Date(),
        type: 'signal',
        severity: 'high',
        message: `New target acquired at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        source: 'MAP_CLICK'
      });
      
      // Fly to the clicked location with smooth animation
      map.current!.flyTo({
        center: [lng, lat],
        zoom: 8,
        speed: 2,
        curve: 1.4,
        easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      });
    });

    // Handle right-click for context menu
    map.current.on('contextmenu', (e) => {
      e.preventDefault();
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      
      addEvent({
        id: generateID(),
        timestamp: new Date(),
        type: 'alert',
        severity: 'medium',
        message: `Context menu requested at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        source: 'MAP_CONTEXT'
      });
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [addMarker, setMouseCoordinates, addAsset, addEvent]);

  return (
    <div className="flex-1 relative overflow-hidden flex items-center justify-center">
      {/* Scanline overlay */}
      <div className="scanline-overlay"></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-brand opacity-10 animate-scanline pointer-events-none z-50"></div>
      
      {/* Real Mapbox Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Tactical HUD Overlay */}
      <div className="absolute inset-10 border-[1px] border-brand/20 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand"></div>
        
        <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-4">
          <div className="h-32 w-1 bg-brand/10 relative">
            <div className="absolute top-1/4 left-0 w-4 h-px bg-brand"></div>
            <span className="absolute -top-6 left-0 text-[8px] font-mono">ALT</span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 text-right font-mono text-[10px] space-y-1">
          <div>HDG: 218.4°</div>
          <div>SPD: 12.4 KT</div>
          <div>BAT: 88% [OK]</div>
        </div>
      </div>

      {/* Live Zoom Preview */}
      <div className="absolute bottom-8 left-8 w-48 h-32 border border-brand bg-black/80 z-20 overflow-hidden rounded-custom shadow-2xl">
        <div className="absolute top-0 left-0 bg-brand text-black text-[8px] px-1 font-bold">ZOOM: X16</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border border-brand opacity-30"></div>
          <div className="absolute w-px h-full bg-brand/20"></div>
          <div className="absolute h-px w-full bg-brand/20"></div>
        </div>
      </div>
    </div>
  );
}
