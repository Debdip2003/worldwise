import React, { useState, useEffect } from "react";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";

const Map = () => {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const mapLatitude = searchParams.get("lat");
  const mapLongitude = searchParams.get("lng");

  //using the geoLocation hook
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    error: geoLocationError,
    getPosition,
  } = useGeolocation();

  //setting up the defaultPosition
  const defaultPosition =
    cities.length > 0 && cities[0].position
      ? [cities[0].position.lat, cities[0].position.lng]
      : [0, 0];

  const [mapPosition, setMapPosition] = useState(defaultPosition);

  //useEffect to initialize the map on each re-rendering
  useEffect(() => {
    if (cities.length > 0 && cities[0].position) {
      setMapPosition([cities[0].position.lat, cities[0].position.lng]);
    }
  }, [cities]);

  //useEffect to update mapPosition when mapLatitude and mapLongitude change
  useEffect(() => {
    if (mapLatitude && mapLongitude) {
      setMapPosition([parseFloat(mapLatitude), parseFloat(mapLongitude)]);
    }
  }, [mapLatitude, mapLongitude]);

  //useEffect to update mapPosition when user clicks on the map
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      {geoLocationError && <p className={styles.error}>{geoLocationError}</p>}
      <MapContainer
        center={mapPosition}
        zoom={6}
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
        <ChangePosition position={mapPosition} />
        <DetectClick />
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

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
