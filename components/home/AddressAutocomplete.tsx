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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // Mapbox Geocoding API
      const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      if (!mapboxToken) {
        console.error("Mapbox access token is missing");
        return;
      }

      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
        params: {
          access_token: mapboxToken,
          limit: 5,
          country: 'IN', // Focus on India
          proximity: '78.96,20.59', // Approx center of India
        },
      });

      const features = response.data.features.map((f: any) => {
        const p = f.place_name || f.text;
        return {
          id: f.center.join(','),
          display_name: p,
        };
      });

      setSuggestions(features);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Mapbox API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    fetchSuggestions(newValue);
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
