import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const mapLatitude = searchParams.get("lat");
  const mapLongitude = searchParams.get("lng");

  const defaultPosition =
    cities.length > 0 && cities[0].position
      ? [cities[0].position.lat, cities[0].position.lng]
      : [0, 0];

  const [mapPosition, setMapPosition] = useState(defaultPosition);

  useEffect(() => {
    if (cities.length > 0 && cities[0].position) {
      setMapPosition([cities[0].position.lat, cities[0].position.lng]);
    }
  }, [cities]);

  useEffect(() => {
    if (mapLatitude && mapLongitude) {
      setMapPosition([parseFloat(mapLatitude), parseFloat(mapLongitude)]);
    }
  }, [mapLatitude, mapLongitude]);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <MapContainer
        // center={[mapLatitude, mapLongitude]}
        center={mapPosition}
        zoom={3}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(
          (city) =>
            city.position && (
              <Marker
                key={city.id}
                position={[city.position.lat, city.position.lng]}
              >
                <Popup>
                  <span>{city.emoji}</span> {city.cityName}
                </Popup>
              </Marker>
            )
        )}
        <ChangePosition position={[mapLatitude || 40, mapLongitude || 0]} />
      </MapContainer>
    </div>
  );
};
function ChangePosition({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}
export default Map;
