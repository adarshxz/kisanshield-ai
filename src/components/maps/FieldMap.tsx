import React, { useState } from 'react';
import { Field } from '../../types';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, AlertCircle, Info, Layers, Eye } from 'lucide-react';

interface FieldMapProps {
  fields: Field[];
  selectedFieldId?: string;
  onSelectField?: (fieldId: string) => void;
  showNdviOverlay?: boolean;
}

// Custom Leaflet DivIcon for modern clean pin markers
const createCustomMarker = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-field-pin',
    html: `
      <div style="background-color: ${color}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.3);">
        ${label}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
};

// Sub-component to re-center map when selected field changes
const ChangeMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, 15);
  return null;
};

export const FieldMap: React.FC<FieldMapProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
  showNdviOverlay = false,
}) => {
  const [mapLayer, setMapLayer] = useState<'osm' | 'satellite'>('osm');

  const selectedField = fields.find(f => f.id === selectedFieldId) || fields[0];
  const center: [number, number] = selectedField ? selectedField.coordinates : [23.0185, 76.5412];

  // Tile layers
  const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-surface-border dark:border-forest-900 shadow-card">
      {/* Map Layer Switcher controls */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1 bg-white/95 dark:bg-forest-950/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-surface-border dark:border-forest-800 text-xs font-semibold">
        <button
          onClick={() => setMapLayer('osm')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            mapLayer === 'osm' 
              ? 'bg-forest-700 text-white' 
              : 'text-kisan-muted hover:text-kisan-text dark:text-gray-300'
          }`}
        >
          Carto Map
        </button>
        <button
          onClick={() => setMapLayer('satellite')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            mapLayer === 'satellite' 
              ? 'bg-forest-700 text-white' 
              : 'text-kisan-muted hover:text-kisan-text dark:text-gray-300'
          }`}
        >
          Satellite
        </button>
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <ChangeMapView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={mapLayer === 'osm' ? osmUrl : satelliteUrl}
        />

        {/* Polygons for Field Boundaries */}
        {fields.map((field) => {
          const isSelected = field.id === selectedFieldId;
          const polygonPositions = field.boundaries || [
            [field.coordinates[0] - 0.001, field.coordinates[1] - 0.001],
            [field.coordinates[0] + 0.001, field.coordinates[1] - 0.001],
            [field.coordinates[0] + 0.001, field.coordinates[1] + 0.001],
            [field.coordinates[0] - 0.001, field.coordinates[1] + 0.001],
          ];

          const fillColor = isSelected
            ? '#22C55E'
            : field.moistureStatus === 'Deficit'
            ? '#F59E0B'
            : '#166534';

          return (
            <React.Fragment key={field.id}>
              <Polygon
                positions={polygonPositions}
                pathOptions={{
                  color: isSelected ? '#166534' : '#22C55E',
                  fillColor: fillColor,
                  fillOpacity: showNdviOverlay ? 0.6 : 0.25,
                  weight: isSelected ? 3 : 1.5,
                }}
                eventHandlers={{
                  click: () => onSelectField?.(field.id),
                }}
              />
              <Marker
                position={field.coordinates}
                icon={createCustomMarker(
                  isSelected ? '#166534' : '#22C55E',
                  field.name.charAt(field.name.indexOf('Field ') + 6) || 'F'
                )}
                eventHandlers={{
                  click: () => onSelectField?.(field.id),
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[180px]">
                    <h4 className="font-bold text-xs text-forest-950 mb-0.5">{field.name}</h4>
                    <p className="text-[11px] text-gray-600 mb-1">
                      Crop: <span className="font-medium">{field.currentCrop}</span>
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                      <span>Area: {field.areaAcres} Ac</span>
                      <span>NDVI: {field.latestNdvi || '0.70'}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay at bottom */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 dark:bg-forest-950/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-surface-border dark:border-forest-800 text-[11px] flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-forest-700 inline-block border border-white" />
          <span className="text-kisan-muted dark:text-gray-300">Optimal Crop Area</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block border border-white" />
          <span className="text-kisan-muted dark:text-gray-300">Moisture Deficit Zone</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-fresh inline-block border border-white" />
          <span className="text-kisan-muted dark:text-gray-300 font-semibold">Active Selection</span>
        </div>
      </div>
    </div>
  );
};
