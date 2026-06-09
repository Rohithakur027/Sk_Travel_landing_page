"use client";

import {
  type FormEvent,
  type InputHTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  Calendar,
  Car,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Minus,
  Navigation,
  Phone,
  Plus,
  User,
  Users,
} from "lucide-react";
import { useToast } from "@/lib/context/ToastContext";
import AddressAutocomplete from "./AddressAutocomplete";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhone(v: string) {
  return /^\d{10}$/.test(v.trim());
}

const cardClassName =
  "relative z-10 mx-auto mb-0 w-full max-w-[85rem] lg:mb-16 rounded-[1.25rem] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.88)] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-[20px] transition-[box-shadow,border-color] duration-300 ease-out hover:border-[rgba(255,255,255,0.5)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-[1.5rem] md:p-[3.5rem] max-[480px]:rounded-2xl max-[480px]:px-4 max-[480px]:py-5";
const toggleClassName =
  "relative mb-5 flex w-full rounded-full border border-[rgba(226,232,240,0.8)] bg-[rgba(241,245,249,0.65)] p-[0.15rem] sm:mb-6 sm:w-fit sm:p-[0.2rem]";
const toggleButtonClassName =
  "relative z-[1] flex-1 whitespace-nowrap rounded-full bg-transparent px-1 py-3 text-sm font-bold text-slate-500 transition-all duration-300 ease-out hover:text-slate-800 sm:px-[2.2rem] sm:py-[0.85rem] sm:text-[0.95rem]";
const fieldBaseClassName =
  "w-full rounded-xl border-[1.5px] border-[rgba(226,232,240,0.8)] bg-[rgba(248,250,252,0.7)] px-5 py-[1.15rem] text-[1.05rem] text-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] outline-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-slate-400 focus:border-[rgba(249,115,22,0.5)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.12)] max-sm:rounded-[0.6rem] max-sm:px-4 max-sm:py-3 max-sm:text-[0.95rem]";
const inputClassName = `${fieldBaseClassName} cursor-text`;
const selectTriggerClassName = `${fieldBaseClassName} flex cursor-pointer select-none items-center`;
const overlayFieldClassName =
  "flex w-full items-center rounded-xl border-[1.5px] border-[rgba(226,232,240,0.8)] bg-[rgba(248,250,252,0.7)] px-5 py-[1.15rem] text-[1.05rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:border-[rgba(249,115,22,0.5)] peer-focus:bg-white peer-focus:shadow-[0_0_0_4px_rgba(249,115,22,0.12)] max-sm:rounded-[0.6rem] max-sm:px-4 max-sm:py-3 max-sm:text-[0.95rem]";
const iconClassName =
  "pointer-events-none absolute inset-y-0 left-0 z-[1] flex items-center pl-5 text-[rgba(255,200,57,1)] transition-all duration-200 ease-out group-focus-within:scale-105 max-sm:pl-[0.85rem]";
const dropdownListClassName =
  "absolute left-0 right-0 top-full z-[1000] mt-2 max-h-[250px] overflow-y-auto rounded-xl border border-[rgba(226,232,240,0.8)] bg-[rgba(255,255,255,0.98)] p-[0.4rem] shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-[8px] animate-dropdown-slide";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  error?: string;
}

const Input = ({ id, placeholder, leftIcon, error, ...props }: InputProps) => (
  <div className="flex w-full flex-col gap-1">
    <div className="group relative w-full">
      {leftIcon && <div className={iconClassName}>{leftIcon}</div>}
      <input
        id={id}
        placeholder={placeholder}
        className={[
          inputClassName,
          leftIcon ? "pl-14 max-sm:pl-10" : "",
          error ? "border-[#f87171] bg-[#fffafb] shadow-[0_0_0_4px_rgba(248,113,113,0.15)]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
    {error && <span className="mt-[0.35rem] block pl-1 text-[0.8rem] font-semibold text-red-600">{error}</span>}
  </div>
);

interface SelectProps {
  id: string;
  options: { value: string; label: string }[];
  leftIcon?: ReactNode;
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
    <div className="flex w-full flex-col gap-1" ref={containerRef}>
      <div className="group relative w-full">
        <div
          className={[
            selectTriggerClassName,
            leftIcon ? "pl-4" : "",
            !value ? "text-slate-400" : "",
            isOpen ? "border-[rgba(249,115,22,0.5)] bg-white shadow-[0_0_0_4px_rgba(249,115,22,0.12)]" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setIsOpen((open) => !open)}
        >
          {leftIcon && <div className={iconClassName}>{leftIcon}</div>}
          <span className={`flex-1 ${leftIcon ? "pl-9" : ""}`}>{selectedOption.label}</span>
          <div className={`flex items-center text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[rgba(255,200,57,1)]" : ""}`}>
            <ChevronDown size={18} />
          </div>
        </div>

        {isOpen && (
          <div className={dropdownListClassName}>
            {options.map((opt) => (
              <div
                key={opt.value}
                className={[
                  "cursor-pointer rounded-lg px-4 py-3 text-[0.95rem] text-slate-700 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:bg-[rgba(249,115,22,0.08)] hover:font-medium hover:text-[var(--color-primary-dark)]",
                  opt.value === "" ? "mb-2 border-b border-slate-100 pb-2 text-[0.85rem] italic text-slate-400 pointer-events-none" : "",
                  opt.value === value ? "bg-[rgba(249,115,22,0.12)] font-semibold text-[var(--color-primary-dark)]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  if (opt.value !== "") {
                    onChange?.({ target: { value: opt.value, id } });
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
  { value: "Sedan", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "Innova", label: "Innova" },
  { value: "Tempo", label: "Tempo Traveller" },
  { value: "Mini", label: "Mini" },
];

const serviceOptions = [
  { value: "", label: "Booking Type" },
  { value: "within_city", label: "Within City" },
  { value: "airport_taxis", label: "Airport Taxis" },
  { value: "out_station", label: "Out Station" },
];

const vehiclePassengerLimits: Record<string, number> = {
  Sedan: 3,
  SUV: 5,
  Hatchback: 3,
  Innova: 5,
  Tempo: 12,
  Mini: 4,
};

function getMaxPassengers(vehicle: string): number {
  return vehiclePassengerLimits[vehicle] ?? 10;
}

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
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">("instant");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState("");
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const body = {
      type: bookingType,
      pickup_location: pickup.trim(),
      destination: destination.trim(),
      vehicle_type: vehicleType,
      booking_category: serviceType,
      is_return_trip: serviceType === "airport_taxis" ? isReturnTrip : false,
      ...(serviceType === "airport_taxis" && isReturnTrip && returnDate && { return_date: returnDate }),
      ...(serviceType === "airport_taxis" && isReturnTrip && returnTime && { return_time: returnTime }),
      passengers,
      name: name.trim(),
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
      ...(bookingType === "instant" && instantTime && { time: instantTime }),
      ...(bookingType === "scheduled" && dateTime && {
        date: dateTime.split("T")[0],
        time: formatDateTimeDisplay(dateTime).split(", ")[1],
      }),
    };

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

    const emailErr =
      email.trim() === "" ? "Email is required." : !isValidEmail(email) ? "Enter a valid email address." : "";
    const phoneErr =
      phone.trim() === ""
        ? "Mobile number is required."
        : !isValidPhone(phone)
          ? "Enter a valid 10-digit mobile number."
          : "";

    if (missingFields.length > 0 || emailErr || phoneErr) {
      setFieldErrors({ email: emailErr, phone: phoneErr });
      if (missingFields.length > 0) {
        showToast("error", "Please fill in all required fields before submitting.");
      }
      return;
    }

    setFieldErrors({ email: "", phone: "" });

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

  const bookingGridClassName =
    bookingType === "instant"
      ? "mb-4 grid grid-cols-1 gap-5 sm:gap-6 lg:mb-8 lg:grid-cols-6 lg:gap-8"
      : "mb-4 grid grid-cols-1 gap-5 sm:gap-6 lg:mb-8 lg:grid-cols-3 lg:gap-8";
  const gridItemClassName = bookingType === "instant" ? "lg:col-span-2" : "lg:col-span-1";

  const openPicker = (e: ReactMouseEvent<HTMLInputElement>) => {
    try {
      e.currentTarget.showPicker();
    } catch {}
  };

  return (
    <div className={cardClassName}>
      <div className={toggleClassName}>
        <div
          className={`absolute bottom-[0.15rem] left-[0.15rem] top-[0.15rem] z-0 w-[calc(50%-0.15rem)] rounded-full bg-white shadow-[0_4px_12px_rgba(249,115,22,0.12),0_2px_4px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] sm:bottom-[0.2rem] sm:left-[0.2rem] sm:top-[0.2rem] sm:w-[calc(50%-0.2rem)] ${bookingType === "instant" ? "translate-x-0" : "translate-x-full"}`}
        />
        <button
          type="button"
          onClick={() => setBookingType("instant")}
          className={`${toggleButtonClassName} ${bookingType === "instant" ? "text-slate-950" : ""}`}
        >
          Instant Booking
        </button>
        <button
          type="button"
          onClick={() => setBookingType("scheduled")}
          className={`${toggleButtonClassName} ${bookingType === "scheduled" ? "text-slate-950" : ""}`}
        >
          Scheduled Booking
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={bookingGridClassName}>
          <div className={gridItemClassName}>
            <AddressAutocomplete
              id="pickup"
              placeholder="Pickup Location *"
              leftIcon={<Navigation size={20} />}
              value={pickup}
              onChange={setPickup}
              onCoordinatesChange={(coords) => {
                setPickupCoords(coords);
                setDistanceKm(null);
              }}
              className={`${inputClassName} pl-14 max-sm:pl-10`}
              wrapperClassName=""
              iconClassName={iconClassName}
            />
          </div>

          <div className={gridItemClassName}>
            <AddressAutocomplete
              id="destination"
              placeholder="Enter your destination *"
              leftIcon={<MapPin size={20} />}
              value={destination}
              onChange={setDestination}
              onCoordinatesChange={(coords) => {
                setDestinationCoords(coords);
                setDistanceKm(null);
              }}
              className={`${inputClassName} pl-14 max-sm:pl-10`}
              wrapperClassName=""
              iconClassName={iconClassName}
            />
          </div>

          <div className={gridItemClassName}>
            <Select
              id="serviceType"
              options={serviceOptions}
              leftIcon={<Navigation size={20} />}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            />
            {serviceType === "airport_taxis" && (
              <label className="mt-[0.85rem] flex cursor-pointer items-center gap-3 pl-2 animate-[fade-in-up_0.3s_ease-out_forwards]">
                <input
                  type="checkbox"
                  checked={isReturnTrip}
                  onChange={(e) => {
                    setIsReturnTrip(e.target.checked);
                    if (!e.target.checked) {
                      setReturnDate("");
                      setReturnTime("");
                    }
                  }}
                  className="h-5 w-5 cursor-pointer accent-[var(--color-primary)]"
                />
                <span className="text-[0.95rem] font-semibold text-slate-600">Return Trip?</span>
              </label>
            )}
            {serviceType === "airport_taxis" && isReturnTrip && (
              <div className="mt-[0.85rem] flex gap-3 animate-[fade-in-up_0.25s_ease-out_forwards]">
                <div className="relative min-w-0 flex-1">
                  <input
                    id="returnDate"
                    type="date"
                    value={returnDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setReturnDate(e.target.value)}
                    onClick={openPicker}
                    className="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className={`${overlayFieldClassName} ${returnDate ? "text-slate-900" : "text-slate-400"}`}>
                    {returnDate || "Return Date *"}
                  </div>
                </div>
                <div className="relative min-w-0 flex-1">
                  <input
                    id="returnTime"
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    onClick={openPicker}
                    className="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className={`${overlayFieldClassName} ${returnTime ? "text-slate-900" : "text-slate-400"}`}>
                    {returnTime || "Return Time *"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={gridItemClassName}>
            <Select
              id="vehicleType"
              options={vehicleOptions}
              leftIcon={<Car size={20} />}
              value={vehicleType}
              onChange={(e) => {
                const nextVehicleType = e.target.value;
                setVehicleType(nextVehicleType);
                if (nextVehicleType) {
                  const max = getMaxPassengers(nextVehicleType);
                  if (passengers > max) {
                    setPassengers(max);
                    const label = vehicleOptions.find((o) => o.value === nextVehicleType)?.label ?? nextVehicleType;
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

          {bookingType === "instant" && (
            <div className={gridItemClassName}>
              <div className="flex w-full flex-col gap-1">
                <div className="group relative w-full">
                  <div className={iconClassName}>
                    <Clock size={20} />
                  </div>
                  <input
                    id="instantTime"
                    type="time"
                    value={instantTime}
                    onChange={(e) => setInstantTime(e.target.value)}
                    onClick={openPicker}
                    className="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className={`${overlayFieldClassName} pl-14 max-sm:pl-10 ${instantTime ? "text-slate-900" : "text-slate-400"}`}>
                    {instantTime || "Pickup Time *"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {bookingType === "scheduled" && (
            <div className={gridItemClassName}>
              <div className="flex w-full flex-col gap-1">
                <div className="group relative w-full">
                  <div className={iconClassName}>
                    <Calendar size={20} />
                  </div>
                  <input
                    id="dateTime"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    onClick={openPicker}
                    className="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className={`${overlayFieldClassName} pl-14 max-sm:pl-10 ${dateTime ? "text-slate-900" : "text-slate-400"}`}>
                    {dateTime ? formatDateTimeDisplay(dateTime) : "Date & Time *"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={gridItemClassName}>
            <div className="flex w-full flex-col gap-1">
              <div className="group relative w-full">
                <div className={iconClassName}>
                  <Users size={20} />
                </div>
                <div
                  className={[
                    overlayFieldClassName,
                    "pl-14 pr-[7rem] text-slate-400 max-sm:pl-10 max-sm:pr-24",
                    passengerError ? "border-[#f87171] bg-[#fffafb] shadow-[0_0_0_4px_rgba(248,113,113,0.15)]" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  Passengers *
                </div>
                <div className="absolute inset-y-0 right-4 z-10 flex items-center gap-3 max-sm:right-3 max-sm:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPassengers(Math.max(1, passengers - 1));
                      setPassengerError("");
                    }}
                    className="flex h-[2rem] w-[2rem] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[rgba(249,115,22,0.3)] hover:bg-[rgba(249,115,22,0.08)] hover:text-[var(--color-primary-dark)] max-sm:h-7 max-sm:w-7"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-[1rem] text-center text-[1.15rem] font-bold text-slate-950 max-sm:text-[0.95rem]">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const max = vehicleType ? getMaxPassengers(vehicleType) : 10;
                      if (passengers < max) {
                        setPassengers(passengers + 1);
                        setPassengerError("");
                      } else {
                        const label =
                          vehicleOptions.find((o) => o.value === vehicleType)?.label ??
                          vehicleType ??
                          "this vehicle";
                        setPassengerError(`Max ${max} passengers allowed for ${label}.`);
                      }
                    }}
                    className="flex h-[2rem] w-[2rem] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[rgba(249,115,22,0.3)] hover:bg-[rgba(249,115,22,0.08)] hover:text-[var(--color-primary-dark)] max-sm:h-7 max-sm:w-7"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              {passengerError && <span className="mt-[0.35rem] block pl-1 text-[0.8rem] font-semibold text-red-600">{passengerError}</span>}
            </div>
          </div>
        </div>

        <div className="mb-0 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-8">
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
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            onBlur={() => {
              if (email && !isValidEmail(email)) {
                setFieldErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
              } else {
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }
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
              if (fieldErrors.phone) {
                setFieldErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            onBlur={() => {
              if (phone && !isValidPhone(phone)) {
                setFieldErrors((prev) => ({ ...prev, phone: "Enter a valid 10-digit mobile number." }));
              } else {
                setFieldErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            error={fieldErrors.phone}
            leftIcon={<Phone size={20} />}
          />
        </div>

        <button
          type="submit"
          className={[
            "mt-7 flex w-full items-center justify-center gap-3 rounded-xl border-none bg-[rgba(255,200,57,1)] px-8 py-[1.15rem] text-[1.1rem] font-bold uppercase tracking-[1px] text-[#111827] shadow-[0_6px_20px_rgba(255,200,57,0.25)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[rgba(255,190,40,1)] hover:shadow-[0_10px_28px_rgba(255,200,57,0.35)] hover:brightness-105 disabled:cursor-not-allowed disabled:bg-[rgba(255,200,57,0.7)] disabled:text-[rgba(17,24,39,0.6)] disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100 sm:mt-10 sm:text-[1.2rem] max-sm:rounded-[0.6rem] max-sm:px-4 max-sm:py-4",
            isSubmitting ? "pointer-events-none" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
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

      <div className="mt-10 flex items-center justify-center gap-2 text-center text-[0.9rem] font-medium text-slate-500">
        <span>
          For Exclusive Bookings and Corporate Inquiries, Please Contact us at{" "}
          <a
            href="https://wa.me/919886897555"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--color-primary)] transition-all duration-200 ease-out hover:border-b hover:border-[var(--color-primary)] hover:brightness-110"
          >
            +91 9886897555
          </a>
        </span>
      </div>
    </div>
  );
}
