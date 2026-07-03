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

interface AddressSuggestion {
  id: string;
  mapbox_id: string;
  name: string;
  address: string;
  display_name: string;
}

interface SelectedAddressDisplay {
  title: string;
  address: string;
  displayName: string;
}

interface MapboxSuggestion {
  mapbox_id: string;
  name: string;
  place_formatted?: string;
  full_address?: string;
}

const SEARCHBOX_BASE = 'https://api.mapbox.com/search/searchbox/v1';
const BANGALORE_PROXIMITY = '77.5946,12.9716';
const BANGALORE_BBOX = '75.75,11.16,79.44,14.78';

const suggestionsListClass =
  'absolute left-0 right-0 top-full z-[1000] mt-2 max-h-[250px] list-none overflow-y-auto rounded-xl border border-[#eef2f6] bg-[#fdfdfd] p-2 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)]';

function newSessionToken(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    // Fall back when the runtime cannot generate a UUID.
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function toSelectedAddressDisplay(title: string, address: string, displayName: string): SelectedAddressDisplay {
  const trimmedTitle = title.trim();
  const trimmedDisplayName = displayName.trim();
  const trimmedAddress = address.trim();
  const addressFromDisplay = trimmedDisplayName.startsWith(`${trimmedTitle},`)
    ? trimmedDisplayName.slice(trimmedTitle.length + 1).trim()
    : trimmedAddress;

  return {
    title: trimmedTitle || trimmedDisplayName,
    address: addressFromDisplay || trimmedAddress,
    displayName: trimmedDisplayName,
  };
}

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
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState<SelectedAddressDisplay | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const sessionTokenRef = useRef<string>(newSessionToken());

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
    const query = rawQuery.trim().replace(/\s+/g, ' ').replace(/[^\w\s,.-]/g, '');
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

    const currentRequest = ++requestIdRef.current;
    setLoading(true);

    try {
      const response = await axios.get(`${SEARCHBOX_BASE}/suggest`, {
        params: {
          q: query,
          access_token: mapboxToken,
          session_token: sessionTokenRef.current,
          limit: 5,
          country: 'IN',
          language: 'en',
          proximity: BANGALORE_PROXIMITY,
          bbox: BANGALORE_BBOX,
        },
      });

      if (currentRequest !== requestIdRef.current) {
        return;
      }

      const nextSuggestions = ((response.data.suggestions || []) as MapboxSuggestion[]).map((suggestion) => ({
        id: suggestion.mapbox_id,
        mapbox_id: suggestion.mapbox_id,
        name: suggestion.name,
        address: suggestion.place_formatted || '',
        display_name:
          suggestion.full_address ||
          (suggestion.place_formatted ? `${suggestion.name}, ${suggestion.place_formatted}` : suggestion.name),
      }));

      setSuggestions(nextSuggestions);
      setShowSuggestions(nextSuggestions.length > 0);
    } catch (error) {
      if (currentRequest === requestIdRef.current) {
        console.error('Mapbox Search Box error:', error);
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
    const nextValue = e.target.value;
    onChange(nextValue);
    onCoordinatesChange?.(null);
    setSelectedDisplay(null);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => fetchSuggestions(nextValue), 250);
  };

  const handleSuggestionClick = async (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    setSelectedDisplay(toSelectedAddressDisplay(suggestion.name, suggestion.address, suggestion.display_name));
    setSuggestions([]);
    setShowSuggestions(false);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!mapboxToken || !suggestion.mapbox_id) {
      onCoordinatesChange?.(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${SEARCHBOX_BASE}/retrieve/${suggestion.mapbox_id}`, {
        params: {
          access_token: mapboxToken,
          session_token: sessionTokenRef.current,
        },
      });

      const feature = response.data.features?.[0];
      const coords = feature?.geometry?.coordinates as [number, number] | undefined;

      onCoordinatesChange?.(coords ?? null);

      // Prefer the fuller address from the retrieved feature when available.
      const full = feature?.properties?.full_address;
      if (full) {
        onChange(full);
        setSelectedDisplay(toSelectedAddressDisplay(suggestion.name, suggestion.address, full));
      }
    } catch (error) {
      console.error('Mapbox Search Box retrieve error:', error);
      onCoordinatesChange?.(null);
    } finally {
      setLoading(false);
      sessionTokenRef.current = newSessionToken();
    }
  };

  const showSelectedDisplay = Boolean(
    selectedDisplay && !isFocused && value.trim() === selectedDisplay.displayName
  );

  return (
    <div className={`relative w-full ${wrapperClassName || ''}`} ref={containerRef}>
      <div className="relative w-full">
        {leftIcon && (
          <div className={`pointer-events-none absolute inset-y-0 left-0 z-[1] flex items-center ${iconClassName || ''}`}>
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          className={`${className || ''} ${showSelectedDisplay ? 'text-transparent caret-slate-900' : ''}`}
          required={required}
          autoComplete="off"
        />
        {showSelectedDisplay && selectedDisplay && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-10 flex min-w-0 flex-col justify-center pl-14 pr-2 max-sm:pl-10">
            <span className="truncate text-[1.05rem] font-bold leading-5 text-slate-950 max-sm:text-[0.95rem]">
              {selectedDisplay.title}
            </span>
            {selectedDisplay.address && (
              <span className="mt-1 truncate text-[0.85rem] font-medium leading-4 text-slate-500 max-sm:text-[0.78rem]">
                {selectedDisplay.address}
              </span>
            )}
          </div>
        )}
        {loading && (
          <div className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-[#f3f3f3] border-t-[#ffc839] animate-autocomplete-spin" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className={suggestionsListClass}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.mapbox_id || `suggestion-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer rounded-lg px-4 py-[0.85rem] transition-all duration-200 ease-out hover:translate-x-1 hover:bg-[rgba(255,200,57,0.9)]"
            >
              <span className="block truncate text-[1rem] font-bold leading-5 text-slate-950">{suggestion.name}</span>
              <span className="mt-1 block truncate text-[0.85rem] font-medium leading-4 text-slate-500">
                {suggestion.address}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
