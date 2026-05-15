"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "@/lib/context/ToastContext";
import { MapPin, Calendar, Clock, Car, Users, ArrowRight, Navigation, Plus, Minus, CheckCircle, XCircle, Loader2, User, Mail, Phone, ChevronDown } from "lucide-react";
import styles from "./BookingForm.module.css";
import AddressAutocomplete from "./AddressAutocomplete";


// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhone(v: string) {
  return /^\d{10}$/.test(v.trim());
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

const Select = ({ id, options, leftIcon, value, onChange, required }: SelectProps) => {
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

const vehicleOptions = [
  { value: "", label: "Vehicle Type" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "traveller", label: "Traveller" },
];

const serviceOptions = [
  { value: "", label: "Booking Type" },
  { value: "within_city", label: "Within City" },
  { value: "airport", label: "Airport Taxis" },
  { value: "outstation", label: "Out Station" },
];

const vehiclePassengerLimits: Record<string, number> = {
  sedan: 3,
  suv: 5,
};

function getMaxPassengers(vehicle: string): number {
  return vehiclePassengerLimits[vehicle] ?? 10;
}

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
  } catch (err) {
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
  const [serviceType, setServiceType] = useState("");
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", phone: "" });
  const [passengerError, setPassengerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

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

    const body = {
      type: bookingType,
      pickup_location: pickup.trim(),
      destination: destination.trim(),
      vehicle_type: vehicleType,
      service_type: serviceType,
      is_return_trip: serviceType === "airport" ? isReturnTrip : false,
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
      ...(distanceKm !== null && { distance_km: distanceKm }),
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
    if (bookingType === "scheduled" && !dateTime) missingFields.push("date & time");

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

    // Validate passenger count against vehicle type
    if (vehicleType) {
      const max = getMaxPassengers(vehicleType);
      if (passengers > max) {
        const label = vehicleOptions.find((o) => o.value === vehicleType)?.label ?? vehicleType;
        setPassengerError(`Max ${max} passengers allowed for ${label}.`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/public/booking-enquiry", {
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
            {serviceType === "airport" && (
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={isReturnTrip}
                  onChange={(e) => setIsReturnTrip(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxLabel}>Return Trip?</span>
              </label>
            )}
          </div>

          <div className={`${bookingType === "instant" ? styles.wideField : ""}`}>
            <Select
              id="vehicleType"
              options={vehicleOptions}
              leftIcon={<Car size={20} />}
              value={vehicleType}
              onChange={(e) => {
                const v = e.target.value;
                setVehicleType(v);
                if (v) {
                  const max = getMaxPassengers(v);
                  if (passengers > max) {
                    setPassengers(max);
                    const label = vehicleOptions.find((o) => o.value === v)?.label ?? v;
                    setPassengerError(`Max ${max} passengers for ${label}. Count adjusted.`);
                  } else {
                    setPassengerError("");
                  }
                } else {
                  setPassengerError("");
                }
              }}
              required
            />
          </div>

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
                  onChange={(e) => setDateTime(e.target.value)}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker();
                    } catch (err) {}
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

          <div className={`${styles.inputGroup} ${bookingType === "instant" ? styles.wideField : ""}`}>
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
                    const max = vehicleType ? getMaxPassengers(vehicleType) : 10;
                    if (passengers < max) {
                      setPassengers(passengers + 1);
                      setPassengerError("");
                    } else {
                      const label = vehicleOptions.find((o) => o.value === vehicleType)?.label ?? vehicleType ?? "this vehicle";
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
            href="https://wa.me/917807818119"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappLink}
          >
            +91 7807818119
          </a>
        </span>
      </div>
    </div>
  );
}
