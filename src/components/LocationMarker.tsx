// Path: src/components/LocationMarker.tsx
"use client";

import { useState } from "react";
import { Marker } from "react-leaflet";
import { SlideUpPanel } from "./SlideUpPanel";
import { LocationContent } from "./LocationContent";
import { getMarkerIcon } from "../../utils/locationUtils";
import type { Location } from "@/lib/types/location";

interface LocationMarkerProps {
  location: Location;
}

export function LocationMarker({ location }: LocationMarkerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkerClick = () => {
    setIsOpen(true);
  };

  const handlePanelClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Marker
        position={location.position}
        icon={getMarkerIcon(location.accessibility)}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      />
      <SlideUpPanel isOpen={isOpen} onClose={handlePanelClose}>
        <LocationContent location={location} />
      </SlideUpPanel>
    </>
  );
}

export default LocationMarker;
