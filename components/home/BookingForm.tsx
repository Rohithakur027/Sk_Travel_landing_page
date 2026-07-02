"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "@/lib/context/ToastContext";
import { MapPin, Calendar, Clock, Car, Users, ArrowRight, Navigation, Plus, Minus, Loader2, User, Mail, Phone, ChevronDown } from "lucide-react";
import styles from "./BookingForm.module.css";
import AddressAutocomplete from "./AddressAutocomplete";
import { apiUrl } from "@/lib/apiBase";


// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhone(v: string) {
  return /^\d{10}$/.test(v.trim());
}

function toLocalInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalInputTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getNextMinute() {
  const date = new Date();
  date.setSeconds(0, 0);
  date.setMinutes(date.getMinutes() + 1);
  return date;
}

function toLocalDateTimeInput(date: Date) {
  return `${toLocalInputDate(date)}T${toLocalInputTime(date)}`;
}

function parseLocalDateTime(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseLocalDateAndTime(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) return null;
  const date = new Date(`${dateValue}T${timeValue}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isPastDateTime(date: Date) {
  return date.getTime() < Date.now();
}

// Local sub-components to reduce dependencies
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  error?: string;
}

const Input = ({ id, placeholder, leftIcon, error, ...props }: InputProps) => (
  <div className={styles.inputGroup}>
    <div className={styles.inputWrapper}>
      {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}
      <input
        id={id}
        placeholder={placeholder}
        className={`${styles.input} ${leftIcon ? styles.hasIcon : ""} ${error ? styles.inputError : ""}`}
        {...props}
      />
    </div>
    {error && <span className={styles.errorMsg}>{error}</span>}
  </div>
);

interface SelectProps {
  id: string;
  options: { value: string; label: string }[];
  leftIcon?: React.ReactNode;
  value?: string;
  onChange?: (e: { target: { value: string; id: string } }) => void;
  required?: boolean;
}

const Select = ({ id, options, leftIcon, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={styles.inputGroup} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <div
          className={`${styles.select} ${leftIcon ? styles.hasIcon : ""} ${
            !value ? styles.isPlaceholder : ""
          } ${isOpen ? styles.selectOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}
          <span className={styles.selectedLabel}>{selectedOption.label}</span>
          <div className={styles.chevron}>
            <ChevronDown
              size={18}
              className={`${styles.chevronIcon} ${isOpen ? styles.chevronRotate : ""}`}
            />
          </div>
        </div>

        {isOpen && (
          <div className={styles.dropdownList}>
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`${styles.dropdownItem} ${
                  opt.value === "" ? styles.dropdownPlaceholder : ""
                } ${opt.value === value ? styles.dropdownItemSelected : ""}`}
                onClick={() => {
                  if (opt.value !== "") {
                    if (onChange) {
                      onChange({ target: { value: opt.value, id } });
                    }
                    setIsOpen(false);
                  }
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const serviceOptions = [
  { value: "", label: "Booking Type" },
  { value: "within_city", label: "Within City" },
  { value: "airport_taxis", label: "Airport Taxis" },
  { value: "out_station", label: "Out Station" },
];

// ─── Vehicle categories ───────────────────────────────────────────────────────
// Top-level category = vehicle_type. Subtype = vehicle_label (Sedan has no
// subtype, so its label falls back to "Sedan"). Passenger limit comes from the
// chosen subtype (or the category itself for Sedan).
interface VehicleSubtype {
  label: string;
  passengers: number;
}
interface VehicleCategory {
  value: string;
  label: string;
  passengers?: number;
  subtypes: VehicleSubtype[];
}

const VEHICLE_CATEGORIES: VehicleCategory[] = [
  { value: "Sedan", label: "Sedan", passengers: 3, subtypes: [] },
  {
    value: "SUV",
    label: "SUV",
    subtypes: [
      { label: "Ertiga", passengers: 5 },
      { label: "Innova", passengers: 5 },
    ],
  },
  {
    value: "LMV",
    label: "LMV",
    subtypes: [
      { label: "12 Seater", passengers: 12 },
      { label: "16 Seater", passengers: 16 },
    ],
  },
  {
    value: "HMV",
    label: "HMV",
    subtypes: [
      { label: "26 Seater", passengers: 26 },
      { label: "30 Seater", passengers: 30 },
      { label: "40 Seater", passengers: 40 },
    ],
  },
];

function getMaxPassengers(category: string, label: string): number {
  const cat = VEHICLE_CATEGORIES.find((c) => c.value === category);
  if (!cat) return 10;
  if (cat.subtypes.length === 0) return cat.passengers ?? 10;
  const sub = cat.subtypes.find((s) => s.label === label);
  return sub?.passengers ?? cat.subtypes[0].passengers;
}

interface VehicleSelectProps {
  category: string;
  label: string;
  onSelect: (category: string, label: string) => void;
}

// Two-level vehicle picker. On desktop, hovering a category reveals its
// subtypes; on touch devices, tapping the category expands them inline.
const VehicleSelect = ({ category, label, onSelect }: VehicleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setExpanded(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const display = !category
    ? "Vehicle Type"
    : label && label !== category
      ? `${category} · ${label}`
      : category;

  const choose = (cat: string, lbl: string) => {
    onSelect(cat, lbl);
    setIsOpen(false);
    setExpanded(null);
  };

  return (
    <div className={styles.inputGroup} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <div
          className={`${styles.select} ${styles.hasIcon} ${
            !category ? styles.isPlaceholder : ""
          } ${isOpen ? styles.selectOpen : ""}`}
          onClick={() => setIsOpen((o) => !o)}
        >
          <div className={styles.iconLeft}>
            <Car size={20} />
          </div>
          <span className={styles.selectedLabel}>{display}</span>
          <div className={styles.chevron}>
            <ChevronDown
              size={18}
              className={`${styles.chevronIcon} ${isOpen ? styles.chevronRotate : ""}`}
            />
          </div>
        </div>

        {isOpen && (
          <div className={styles.dropdownList}>
            {VEHICLE_CATEGORIES.map((cat) => {
              if (cat.subtypes.length === 0) {
                return (
                  <div
                    key={cat.value}
                    className={`${styles.dropdownItem} ${
                      category === cat.value ? styles.dropdownItemSelected : ""
                    }`}
                    onClick={() => choose(cat.value, cat.label)}
                  >
                    {cat.label}
                  </div>
                );
              }
              const isExpanded = expanded === cat.value;
              return (
                <div
                  key={cat.value}
                  className={styles.vehicleGroup}
                  onMouseEnter={() => setExpanded(cat.value)}
                >
                  <div
                    className={`${styles.dropdownItem} ${styles.vehicleParent} ${
                      category === cat.value ? styles.dropdownItemSelected : ""
                    }`}
                    onClick={() => setExpanded(isExpanded ? null : cat.value)}
                  >
                    <span>{cat.label}</span>
                    <ChevronDown
                      size={16}
                      className={`${styles.subChevron} ${isExpanded ? styles.chevronRotate : ""}`}
                    />
                  </div>
                  {isExpanded && (
                    <div className={styles.subList}>
                      {cat.subtypes.map((sub) => (
                        <div
                          key={sub.label}
                          className={`${styles.dropdownItem} ${styles.subItem} ${
                            category === cat.value && label === sub.label
                              ? styles.dropdownItemSelected
                              : ""
                          }`}
                          onClick={() => choose(cat.value, sub.label)}
                        >
                          {sub.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/** "2024-05-24T14:30" → "2024-05-24, 02:30 PM" */
function formatDateTimeDisplay(dt: string): string {
  if (!dt) return "";
  try {
    const [datePart, timePart] = dt.split("T");
    const [h, m] = timePart.split(":");
    let hours = parseInt(h, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${m} ${ampm}`;
    return `${datePart}, ${formattedTime}`;
  } catch {
    return dt;
  }
}

export default function BookingForm() {
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">(
    "instant",
  );
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleLabel, setVehicleLabel] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [instantTime, setInstantTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", phone: "" });
  const [passengerError, setPassengerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const minimumBookingDateTime = toLocalDateTimeInput(getNextMinute());
  const minimumBookingDate = minimumBookingDateTime.split("T")[0];
  const minimumBookingTime = minimumBookingDateTime.split("T")[1];

  useEffect(() => {
    if (!pickupCoords || !destinationCoords) {
      setDistanceKm(null);
      return;
    }
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) return;
    const [pLng, pLat] = pickupCoords;
    const [dLng, dLat] = destinationCoords;
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pLng},${pLat};${dLng},${dLat}?access_token=${token}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.routes?.length > 0) {
          setDistanceKm(Math.round((data.routes[0].distance / 1000) * 100) / 100);
        } else {
          setDistanceKm(null);
        }
      })
      .catch(() => setDistanceKm(null));
  }, [pickupCoords, destinationCoords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const isAirportReturnTrip = serviceType === "airport_taxis" && isReturnTrip;
    const submittedDistanceKm =
      distanceKm !== null
        ? Math.round(distanceKm * (isAirportReturnTrip ? 2 : 1) * 100) / 100
        : null;

    const body = {
      type: bookingType,
      pickup_location: pickup.trim(),
      destination: destination.trim(),
      vehicle_type: vehicleType,
      vehicle_label: vehicleLabel || vehicleType,
      booking_category: serviceType,
      is_return_trip: isAirportReturnTrip,
      ...(isAirportReturnTrip && returnDate && { return_date: returnDate }),
      ...(isAirportReturnTrip && returnTime && { return_time: returnTime }),
      passengers,
      name:  name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ...(pickupCoords && {
        pickup_lng: pickupCoords[0],
        pickup_lat: pickupCoords[1],
      }),
      ...(destinationCoords && {
        destination_lng: destinationCoords[0],
        destination_lat: destinationCoords[1],
      }),
      ...(submittedDistanceKm !== null && { distance_km: submittedDistanceKm }),
      ...(bookingType === "instant" && instantTime && { time: instantTime }),
      ...(bookingType === "scheduled" && dateTime && {
        date: dateTime.split("T")[0],
        time: formatDateTimeDisplay(dateTime).split(", ")[1],
      }),
    };

    // Validate all required fields
    const missingFields: string[] = [];
    if (!pickup.trim()) missingFields.push("pickup location");
    if (!destination.trim()) missingFields.push("destination");
    if (!vehicleType) missingFields.push("vehicle type");
    if (!serviceType) missingFields.push("booking type");
    if (!name.trim()) missingFields.push("your name");
    if (bookingType === "instant" && !instantTime) missingFields.push("pickup time");
    if (bookingType === "scheduled" && !dateTime) missingFields.push("date & time");
    if (serviceType === "airport_taxis" && isReturnTrip && !returnDate) missingFields.push("return date");
    if (serviceType === "airport_taxis" && isReturnTrip && !returnTime) missingFields.push("return time");

    const emailErr = email.trim() === "" ? "Email is required." : !isValidEmail(email) ? "Enter a valid email address." : "";
    const phoneErr = phone.trim() === "" ? "Mobile number is required." : !isValidPhone(phone) ? "Enter a valid 10-digit mobile number." : "";

    if (missingFields.length > 0 || emailErr || phoneErr) {
      setFieldErrors({ email: emailErr, phone: phoneErr });
      if (missingFields.length > 0) {
        showToast("error", "Please fill in all required fields before submitting.");
      }
      return;
    }
    setFieldErrors({ email: "", phone: "" });

    const pickupDateTime =
      bookingType === "scheduled"
        ? parseLocalDateTime(dateTime)
        : parseLocalDateAndTime(toLocalInputDate(new Date()), instantTime);

    if (!pickupDateTime || isPastDateTime(pickupDateTime)) {
      showToast("error", "Past dates and times are not allowed.");
      return;
    }

    if (isAirportReturnTrip) {
      const returnDateTime = parseLocalDateAndTime(returnDate, returnTime);
      if (!returnDateTime || isPastDateTime(returnDateTime)) {
        showToast("error", "Past return dates and times are not allowed.");
        return;
      }
    }

    // Validate passenger count against vehicle type
    if (vehicleType) {
      const max = getMaxPassengers(vehicleType, vehicleLabel);
      if (passengers > max) {
        const label = vehicleLabel || vehicleType;
        setPassengerError(`Max ${max} passengers allowed for ${label}.`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(apiUrl("/api/public/booking-enquiry"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log("[BookingForm] response:", data);
      if (res.ok && data.success) {
        showToast("success", "Your enquiry has been submitted! We'll be in touch shortly.");
      } else {
        showToast("error", data.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("[BookingForm] submit error:", err);
      showToast("error", "Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className={styles.card}>
      {/* Toggle */}
      <div className={styles.toggle}>
        <div
          className={`${styles.slider} ${
            bookingType === "instant" ? styles.instantActive : styles.scheduledActive
          }`}
        />
        <button
          type="button"
          onClick={() => setBookingType("instant")}
          className={`${styles.toggleBtn} ${
            bookingType === "instant" ? styles.toggleBtnActive : ""
          }`}
        >
          Instant Booking
        </button>
        <button
          type="button"
          onClick={() => setBookingType("scheduled")}
          className={`${styles.toggleBtn} ${
            bookingType === "scheduled" ? styles.toggleBtnActive : ""
          }`}
        >
          Scheduled Booking
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`${styles.grid} ${
          bookingType === "instant" ? styles.instantGrid : styles.scheduledGrid
        }`}>
          {/* Row 1: Locations */}
          <AddressAutocomplete
            id="pickup"
            placeholder="Pickup Location *"
            leftIcon={<Navigation size={20} />}
            value={pickup}
            onChange={(val) => setPickup(val)}
            onCoordinatesChange={(coords) => {
              setPickupCoords(coords);
              setDistanceKm(null);
            }}
            className={`${styles.input} ${styles.hasIcon}`}
            wrapperClassName={styles.inputWrapper}
            iconClassName={styles.iconLeft}
          />
          <AddressAutocomplete
            id="destination"
            placeholder="Enter your destination *"
            leftIcon={<MapPin size={20} />}
            value={destination}
            onChange={(val) => setDestination(val)}
            onCoordinatesChange={(coords) => {
              setDestinationCoords(coords);
              setDistanceKm(null);
            }}
            className={`${styles.input} ${styles.hasIcon}`}
            wrapperClassName={styles.inputWrapper}
            iconClassName={styles.iconLeft}
          />

          {/* Row 2: Booking Type, Vehicle Type & Passengers */}
          <div className={styles.inputGroup}>
            <Select
              id="serviceType"
              options={serviceOptions}
              leftIcon={<Navigation size={20} />}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            />
            {serviceType === "airport_taxis" && (
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={isReturnTrip}
                  onChange={(e) => {
                    setIsReturnTrip(e.target.checked);
                    if (!e.target.checked) { setReturnDate(""); setReturnTime(""); }
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxLabel}>Return Trip?</span>
              </label>
            )}
            {serviceType === "airport_taxis" && isReturnTrip && (
              <div className={styles.returnDateWrapper}>
                {/* Return Date */}
                <div className={styles.inputWrapper}>
                  <input
                    id="returnDate"
                    type="date"
                    value={returnDate}
                    min={minimumBookingDate}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      const selectedDateTime = parseLocalDateAndTime(
                        selectedDate,
                        returnTime || "23:59",
                      );
                      if (selectedDateTime && isPastDateTime(selectedDateTime)) {
                        setReturnDate("");
                        showToast("error", "Past return dates and times are not allowed.");
                        return;
                      }
                      setReturnDate(selectedDate);
                    }}
                    onClick={(e) => { try { e.currentTarget.showPicker(); } catch {} }}
                    className={`${styles.input} ${styles.returnDateInput}`}
                  />
                  {!returnDate ? (
                    <div className={styles.returnFieldPlaceholder}>Return Date *</div>
                  ) : (
                    <div className={styles.returnFieldValue}>{returnDate}</div>
                  )}
                </div>
                {/* Return Time */}
                <div className={styles.inputWrapper}>
                  <input
                    id="returnTime"
                    type="time"
                    value={returnTime}
                    min={returnDate === minimumBookingDate ? minimumBookingTime : undefined}
                    onChange={(e) => {
                      const selectedTime = e.target.value;
                      const selectedDateTime = parseLocalDateAndTime(
                        returnDate || minimumBookingDate,
                        selectedTime,
                      );
                      if (selectedDateTime && isPastDateTime(selectedDateTime)) {
                        setReturnTime("");
                        showToast("error", "Past return dates and times are not allowed.");
                        return;
                      }
                      setReturnTime(selectedTime);
                    }}
                    onClick={(e) => { try { e.currentTarget.showPicker(); } catch {} }}
                    className={`${styles.input} ${styles.returnDateInput}`}
                  />
                  {!returnTime ? (
                    <div className={styles.returnFieldPlaceholder}>Return Time *</div>
                  ) : (
                    <div className={styles.returnFieldValue}>{returnTime}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <VehicleSelect
              category={vehicleType}
              label={vehicleLabel}
              onSelect={(cat, lbl) => {
                setVehicleType(cat);
                setVehicleLabel(lbl);
                const max = getMaxPassengers(cat, lbl);
                if (passengers > max) {
                  setPassengers(max);
                  setPassengerError(`Max ${max} passengers for ${lbl}. Count adjusted.`);
                } else {
                  setPassengerError("");
                }
              }}
            />
          </div>

          {/* Time field — instant booking only */}
          {bookingType === "instant" && (
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <div className={styles.iconLeft}>
                  <Clock size={20} />
                </div>
                <input
                  id="instantTime"
                  type="time"
                  value={instantTime}
                  min={minimumBookingTime}
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const selectedDateTime = parseLocalDateAndTime(
                      minimumBookingDate,
                      selectedTime,
                    );
                    if (selectedDateTime && isPastDateTime(selectedDateTime)) {
                      setInstantTime("");
                      showToast("error", "Past dates and times are not allowed.");
                      return;
                    }
                    setInstantTime(selectedTime);
                  }}
                  onClick={(e) => { try { e.currentTarget.showPicker(); } catch {} }}
                  className={`${styles.input} ${styles.hasIcon} ${styles.datetimeInput}`}
                />
                {!instantTime ? (
                  <div className={styles.datetimePlaceholder}>Pickup Time *</div>
                ) : (
                  <div className={styles.datetimeValue}>{instantTime}</div>
                )}
              </div>
            </div>
          )}

          {/* Row 3: Date/Time (if scheduled) & Passengers */}
          {bookingType === "scheduled" && (
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <div className={styles.iconLeft}>
                  <Calendar size={20} />
                </div>
                <input
                  id="dateTime"
                  type="datetime-local"
                  value={dateTime}
                  min={minimumBookingDateTime}
                  onChange={(e) => {
                    const selectedDateTime = parseLocalDateTime(e.target.value);
                    if (selectedDateTime && isPastDateTime(selectedDateTime)) {
                      setDateTime("");
                      showToast("error", "Past dates and times are not allowed.");
                      return;
                    }
                    setDateTime(e.target.value);
                  }}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker();
                    } catch {}
                  }}
                  className={`${styles.input} ${styles.hasIcon} ${styles.datetimeInput}`}
                />
                {!dateTime ? (
                  <div className={styles.datetimePlaceholder}>Date & Time *</div>
                ) : (
                  <div className={styles.datetimeValue}>{formatDateTimeDisplay(dateTime)}</div>
                )}
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={`${styles.counterWrapper} ${passengerError ? styles.counterError : ""}`}>
              <div className={styles.iconLeft}><Users size={20} /></div>
              <span className={styles.counterLabel}>Passengers *</span>
              <div className={styles.counterControls}>
                <button
                  type="button"
                  onClick={() => { setPassengers(Math.max(1, passengers - 1)); setPassengerError(""); }}
                  className={styles.counterBtn}
                >
                  <Minus size={18} />
                </button>
                <span className={styles.counterValue}>{passengers}</span>
                <button
                  type="button"
                  onClick={() => {
                    const max = vehicleType ? getMaxPassengers(vehicleType, vehicleLabel) : 10;
                    if (passengers < max) {
                      setPassengers(passengers + 1);
                      setPassengerError("");
                    } else {
                      const label = vehicleLabel || vehicleType || "this vehicle";
                      setPassengerError(`Max ${max} passengers allowed for ${label}.`);
                    }
                  }}
                  className={styles.counterBtn}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            {passengerError && <span className={styles.errorMsg}>{passengerError}</span>}
          </div>
        </div>

        {/* Contact Details */}
        <div className={styles.contactGrid}>
          <Input
            id="name"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User size={20} />}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors(fe => ({ ...fe, email: "" }));
            }}
            onBlur={() => {
              if (email && !isValidEmail(email))
                setFieldErrors(fe => ({ ...fe, email: "Enter a valid email address." }));
              else
                setFieldErrors(fe => ({ ...fe, email: "" }));
            }}
            error={fieldErrors.email}
            leftIcon={<Mail size={20} />}
          />
          <Input
            id="phone"
            type="tel"
            placeholder="Mobile Number *"
            value={phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
              if (fieldErrors.phone) setFieldErrors(fe => ({ ...fe, phone: "" }));
            }}
            onBlur={() => {
              if (phone && !isValidPhone(phone))
                setFieldErrors(fe => ({ ...fe, phone: "Enter a valid 10-digit mobile number." }));
              else
                setFieldErrors(fe => ({ ...fe, phone: "" }));
            }}
            error={fieldErrors.phone}
            leftIcon={<Phone size={20} />}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnLoading : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className={styles.spinner} />
              Submitting…
            </>
          ) : (
            <>
              Submit Enquiry
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      {/* Footer Text */}
      <div className={styles.footer}>
        <span>
          For Exclusive Bookings and Corporate Inquiries, Please Contact us at:{" "}
          <a
            href="https://wa.me/919886897555"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappLink}
          >
            +91 9886897555
          </a>
        </span>
      </div>
    </div>
  );
}
