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
      // Photon API: No key required. 
      // We use lon=78.9629&lat=20.5937 (approx center of India) to prioritize results.
      const response = await axios.get(`https://photon.komoot.io/api/`, {
        params: {
          q: query,
          limit: 5,
          lon: 78.96,
          lat: 20.59,
        },
      });

      const features = response.data.features.map((f: any) => {
        const p = f.properties;
        // Construct a readable address from Photon properties
        const parts = [p.name, p.street, p.district, p.city, p.state, p.country].filter(Boolean);
        return {
          id: f.geometry.coordinates.join(','),
          display_name: parts.join(', '),
        };
      });

      setSuggestions(features);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Photon API error:", error);
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
