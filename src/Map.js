import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

function MapSection() {
  const position = [10.851185, 106.65628];
  return (
    <div className="map">
      <LeafletMap
        center={position}
        zoom={7}
        maxZoom={12}
        minZoom={2}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
    
  );
}

export default MapSection;
