// src/components/MapComponent.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const earthquakeIcon = new L.Icon({
  iconUrl: 'https://example.com/earthquake-icon.png', // Replace with a suitable icon URL
  iconSize: [25, 25],
});

const MapComponent = () => {
  const [earthquakeData, setEarthquakeData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
      )
      .then((response) => setEarthquakeData(response.data.features))
      .catch((error) =>
        console.error('Error fetching earthquake data:', error)
      );
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className='w-full h-full rounded-lg shadow-lg'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {earthquakeData.map((earthquake) => {
        const { mag, place } = earthquake.properties;
        const [longitude, latitude] = earthquake.geometry.coordinates;

        return (
          <Marker
            key={earthquake.id}
            position={[latitude, longitude]}
            icon={earthquakeIcon}
          >
            <Popup className='text-center'>
              <p className='text-lg font-semibold'>Location: {place}</p>
              <p className='text-sm'>
                Magnitude: <span className='font-bold'>{mag}</span>
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
