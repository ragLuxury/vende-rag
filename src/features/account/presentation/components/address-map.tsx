'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps';

export interface SelectedPlace {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface AddressMapProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  defaultCenter: LatLng;
  markerPosition: LatLng | null;
  onPlaceSelect: (place: SelectedPlace) => void;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function AddressMap(props: AddressMapProps) {
  if (!apiKey) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 px-6 text-center text-sm text-neutral-400">
        Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para mostrar el mapa.
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <MapCanvas {...props} />
    </APIProvider>
  );
}

function MapCanvas({
  searchValue,
  onSearchChange,
  defaultCenter,
  markerPosition,
  onPlaceSelect,
}: AddressMapProps) {
  const geocodingLibrary = useMapsLibrary('geocoding');
  const geocoder = useMemo(
    () => (geocodingLibrary ? new geocodingLibrary.Geocoder() : null),
    [geocodingLibrary],
  );

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      const latLng = event.detail.latLng;
      if (!latLng || !geocoder) return;

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status !== 'OK' || !results?.[0]) return;
        const place = toSelectedPlace(results[0].address_components, latLng.lat, latLng.lng);
        onPlaceSelect(place);
      });
    },
    [geocoder, onPlaceSelect],
  );

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-neutral-200">
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={handleMapClick}
        className="h-full w-full"
      >
        {markerPosition ? <Marker position={markerPosition} /> : null}
        <MapRecenter position={markerPosition} />
      </Map>

      <div className="absolute inset-x-3 top-3">
        <PlaceSearchInput value={searchValue} onChange={onSearchChange} onSelect={onPlaceSelect} />
      </div>
    </div>
  );
}

function MapRecenter({ position }: { position: LatLng | null }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !position) return;
    map.panTo(position);
    map.setZoom(16);
  }, [map, position]);

  return null;
}

interface PlaceSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: SelectedPlace) => void;
}

function PlaceSearchInput({ value, onChange, onSelect }: PlaceSearchInputProps) {
  const placesLibrary = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!placesLibrary || !inputRef.current) return;

    const autocomplete = new placesLibrary.Autocomplete(inputRef.current, {
      fields: ['address_components', 'geometry'],
      componentRestrictions: { country: 'mx' },
      types: ['geocode'],
    });

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
      if (!place.address_components || !location) return;
      onSelectRef.current(
        toSelectedPlace(place.address_components, location.lat(), location.lng()),
      );
    });

    return () => listener.remove();
  }, [placesLibrary]);

  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-[11px] shadow-md">
      <span className="text-neutral-400">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="7" strokeWidth="2" />
          <path d="m20 20-3-3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca tu dirección"
        aria-label="Buscar dirección"
        className="w-full bg-transparent text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
      />
    </div>
  );
}

function toSelectedPlace(
  components: google.maps.GeocoderAddressComponent[] | undefined,
  latitude: number,
  longitude: number,
): SelectedPlace {
  const get = (type: string): string =>
    components?.find((component) => component.types.includes(type))?.long_name ?? '';

  return {
    street: get('route'),
    neighborhood: get('sublocality_level_1') || get('neighborhood') || get('sublocality'),
    city: get('locality') || get('administrative_area_level_2'),
    state: get('administrative_area_level_1'),
    country: get('country'),
    postalCode: get('postal_code'),
    latitude,
    longitude,
  };
}
