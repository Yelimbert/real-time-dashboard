import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type Alert = {
    id: string;
    message: string;
    location: string;
    timestamp: string;
};

type Props = {
    alert: Alert;
    position: [number, number];
    focus?: boolean;
};

export default function AlertMarker({ alert, position, focus }: Props) {
    const map = useMap();

    useEffect(() => {
        if (focus) {
            map.flyTo(position, map.getZoom(), {
                duration: 1.5,
            });
        }
    }, [focus, position, map]);

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                <strong>{alert.message}</strong>
                <br />
                {alert.location}
                <br />
                {new Date(alert.timestamp).toLocaleString()}
            </Popup>
        </Marker>
    );
}