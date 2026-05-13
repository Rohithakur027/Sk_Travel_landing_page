import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./AddressAutocomplete.module.css";

interface AddressAutocompleteProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  iconClassName?: string;
}

// Bangalore bounding box [minLng, minLat, maxLng, maxLat] — wide enough to
// cover every neighbourhood, layout, and surrounding suburb (Whitefield,
// Electronic City, Yelahanka, Kengeri, Anekal, Devanahalli, etc.).
const BANGALORE_BBOX = "77.30,12.70,77.90,13.30";
const BANGALORE_PROXIMITY = "77.5946,12.9716";
const BANGALORE_KEYWORDS = ["bangalore", "bengaluru", "karnataka"];

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  id,
  placeholder,
  value,
  onChange,
  leftIcon,
  required,
  className,
  wrapperClassName,
  iconClassName,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
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
      console.error("Mapbox access token is missing");
      return;
    }

    // Append "Bangalore" hint to the query when the user hasn't typed it
    // themselves — keeps the search loose but biases results toward the city.
    const lowered = query.toLowerCase();
    const hasCityHint = BANGALORE_KEYWORDS.some((kw) => lowered.includes(kw));
    const searchQuery = hasCityHint ? query : `${query}, Bangalore`;

    const currentRequest = ++requestIdRef.current;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`,
        {
          params: {
            access_token: mapboxToken,
            limit: 8,
            country: "IN",
            proximity: BANGALORE_PROXIMITY,
            bbox: BANGALORE_BBOX,
            language: "en",
            autocomplete: true,
            // Cover localities, neighborhoods, streets, landmarks, POIs.
            types: "place,locality,neighborhood,address,poi,district,postcode",
          },
        }
      );

      // Drop stale responses if the user kept typing.
      if (currentRequest !== requestIdRef.current) return;

      const features = (response.data.features || [])
        .filter((f: any) => {
          // bbox already constrains geographically; do a soft text check too
          // so anything obviously outside Bangalore gets hidden.
          const name = (f.place_name || "").toLowerCase();
          return BANGALORE_KEYWORDS.some((kw) => name.includes(kw));
        })
        .map((f: any) => ({
          id: f.id || f.center.join(","),
          display_name: f.place_name || f.text,
        }));

      setSuggestions(features);
      setShowSuggestions(features.length > 0);
    } catch (error) {
      if (currentRequest === requestIdRef.current) {
        console.error("Mapbox API error:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } finally {
      if (currentRequest === requestIdRef.current) setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 250);
  };

  const handleSuggestionClick = (suggestion: any) => {
    onChange(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`${styles.container} ${wrapperClassName || ""}`} ref={containerRef}>
      <div className={styles.inputWrapper}>
        {leftIcon && <div className={`${styles.iconLeft} ${iconClassName || ""}`}>{leftIcon}</div>}
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className={`${styles.input} ${className || ""}`}
          required={required}
          autoComplete="off"
        />
        {loading && <div className={styles.loader}></div>}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.id}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
