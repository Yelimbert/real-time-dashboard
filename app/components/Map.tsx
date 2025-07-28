"use client";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AlertMarker from './AlertMarker';


const locationCoordinates: Record<string, [number, number]> = {
  'North Gate': [40.730610, -73.935242],
  'Main Hall': [40.650002, -73.949997],
  'Storage': [40.789623, -73.959893],
  'Control Room': [40.844782, -73.864827],
};

type Alert = {
  id: string,
  message: string,
  location: string,
  timestamp: string,
};

type Props = {
  alert?: Alert;
};

export default function Map({ alert }: Props) {
  const coords = alert ? locationCoordinates[alert.location] : undefined;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer 
        center={[40.7138, -74.0060]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {alert && coords && (
          <AlertMarker
            key={alert.id}
            alert={alert}
            position={coords}
            focus={true}
          />
        )}
      </MapContainer>
    </div>
  );
}