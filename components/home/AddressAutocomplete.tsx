import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface AddressAutocompleteProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (coords: [number, number] | null) => void;
  leftIcon?: React.ReactNode;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  iconClassName?: string;
}

interface MapboxFeature {
  id?: string;
  text?: string;
  place_name?: string;
  center: [number, number];
  place_type?: string[];
}

interface AddressSuggestion {
  id: string;
  display_name: string;
  center: [number, number];
}

const BANGALORE_PROXIMITY = '77.5946,12.9716';
const BANGALORE_KEYWORDS = ['bangalore', 'bengaluru', 'karnataka'];

const BIG_CITIES_OUTSIDE_BANGALORE = new Set([
  'mumbai', 'delhi', 'new delhi', 'chennai', 'hyderabad', 'kolkata',
  'pune', 'ahmedabad', 'jaipur', 'lucknow', 'surat', 'kanpur', 'nagpur',
  'indore', 'bhopal', 'visakhapatnam', 'patna', 'vadodara', 'ghaziabad',
  'ludhiana', 'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 'varanasi',
  'coimbatore', 'kochi', 'chandigarh', 'mysore', 'mysuru', 'mangalore', 'mangaluru',
]);

const suggestionsListClass =
  'absolute left-0 right-0 top-full z-[1000] mt-2 max-h-[250px] list-none overflow-y-auto rounded-xl border border-[#eef2f6] bg-[#fdfdfd] p-2 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)]';

export default function AddressAutocomplete({
  id,
  placeholder,
  value,
  onChange,
  onCoordinatesChange,
  leftIcon,
  required,
  className,
  wrapperClassName,
  iconClassName,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const fetchSuggestions = async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!mapboxToken) {
      console.error('Mapbox access token is missing');
      return;
    }

    const lowered = query.toLowerCase();
    const hasBangaloreHint = BANGALORE_KEYWORDS.some((kw) => lowered.includes(kw));
    const hasBigCityHint = Array.from(BIG_CITIES_OUTSIDE_BANGALORE).some((c) => lowered.includes(c));
    const searchQuery = hasBangaloreHint || hasBigCityHint ? query : `${query}, Bangalore`;

    const currentRequest = ++requestIdRef.current;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`,
        {
          params: {
            access_token: mapboxToken,
            limit: 10,
            country: 'IN',
            proximity: BANGALORE_PROXIMITY,
            language: 'en',
            autocomplete: true,
            types: 'place,locality,neighborhood,address,poi,district,postcode',
          },
        }
      );

      if (currentRequest !== requestIdRef.current) {
        return;
      }

      const features = ((response.data.features || []) as MapboxFeature[])
        .filter((feature) => {
          const name = (feature.place_name || '').toLowerCase();
          const text = (feature.text || '').toLowerCase();
          const placeTypes: string[] = feature.place_type || [];

          if (BANGALORE_KEYWORDS.some((kw) => name.includes(kw))) {
            return true;
          }

          if (placeTypes.includes('place') && BIG_CITIES_OUTSIDE_BANGALORE.has(text)) {
            return true;
          }

          return false;
        })
        .map((feature) => ({
          id: feature.id || feature.center.join(','),
          display_name: feature.place_name || feature.text || "",
          center: feature.center,
        }));

      setSuggestions(features);
      setShowSuggestions(features.length > 0);
    } catch (error) {
      if (currentRequest === requestIdRef.current) {
        console.error('Mapbox API error:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } finally {
      if (currentRequest === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    onCoordinatesChange?.(null);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 250);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    onCoordinatesChange?.(suggestion.center ?? null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative w-full ${wrapperClassName || ''}`} ref={containerRef}>
      <div className="relative w-full">
        {leftIcon && <div className={`pointer-events-none absolute inset-y-0 left-0 z-[1] flex items-center ${iconClassName || ''}`}>{leftIcon}</div>}
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className={className || ''}
          required={required}
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-[#f3f3f3] border-t-[#ffc839] animate-autocomplete-spin" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className={suggestionsListClass}>
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.id}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer rounded-lg px-4 py-[0.85rem] text-[0.95rem] text-slate-700 transition-all duration-200 ease-out hover:translate-x-1 hover:bg-[rgba(255,200,57,0.9)] hover:text-black"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
