"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, Clock, Car, Users, ArrowRight, Navigation, Plus, Minus, CheckCircle, XCircle, Loader2, User, Mail, Phone } from "lucide-react";
import styles from "./BookingForm.module.css";

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastState {
  visible: boolean;
  type: "success" | "error";
  message: string;
}

function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast.visible, onClose]);

  // Always rendered — visibility controlled by CSS only to avoid removeChild errors
  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${toast.visible ? styles.toastVisible : styles.toastHidden}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.toastIcon}>
        {toast.type === "success"
          ? <CheckCircle size={20} />
          : <XCircle size={20} />}
      </span>
      <span className={styles.toastMessage}>{toast.message}</span>
      <button className={styles.toastClose} onClick={onClose} aria-label="Dismiss">×</button>
    </div>
  );
}

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

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  leftIcon?: React.ReactNode;
}

const Select = ({ id, options, leftIcon, ...props }: SelectProps) => (
  <div className={styles.inputGroup}>
    <div className={styles.inputWrapper}>
      {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}
      <select
        id={id}
        className={`${styles.select} ${leftIcon ? styles.hasIcon : ""}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className={styles.chevron}>
        <svg
          className={styles.chevronIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  </div>
);

const vehicleOptions = [
  { value: "", label: "Vehicle Type" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "traveller", label: "Traveller" },
];

/** "09:00" → "09:00 AM"  |  "14:30" → "02:30 PM" */
function formatTimeDisplay(t: string): string {
  if (!t) return "";
  const [h, m] = t.split(":");
  let hours = parseInt(h, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, "0")}:${m} ${ampm}`;
}

export default function BookingForm() {
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">(
    "scheduled",
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, type: "success", message: "" });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ visible: true, type, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget as HTMLFormElement;
    const pickup      = (form.querySelector("#pickup")      as HTMLInputElement)?.value ?? "";
    const destination = (form.querySelector("#destination") as HTMLInputElement)?.value ?? "";
    const vehicleType = (form.querySelector("#vehicleType") as HTMLSelectElement)?.value ?? "";

    const body = {
      type: bookingType,
      pickup_location: pickup.trim(),
      destination: destination.trim(),
      vehicle_type: vehicleType,
      passengers,
      name:  name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ...(bookingType === "scheduled" && {
        date,
        time: formatTimeDisplay(time),
      }),
    };

    // Validate email and phone before sending
    const emailErr = email.trim() === "" ? "Email is required." : !isValidEmail(email) ? "Enter a valid email address." : "";
    const phoneErr = phone.trim() === "" ? "Mobile number is required." : !isValidPhone(phone) ? "Enter a valid 10-digit mobile number." : "";
    if (emailErr || phoneErr) {
      setFieldErrors({ email: emailErr, phone: phoneErr });
      return;
    }
    setFieldErrors({ email: "", phone: "" });

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
    <>
    <Toast toast={toast} onClose={() => setToast(t => ({ ...t, visible: false }))} />
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

      <form onSubmit={handleSubmit}>
        <div className={`${styles.grid} ${
          bookingType === "instant" ? styles.instantGrid : styles.scheduledGrid
        }`}>
          {/* Row 1: Locations */}
          <Input
            id="pickup"
            placeholder="Pickup Location"
            leftIcon={<Navigation size={20} />}
          />
          <Input
            id="destination"
            placeholder="Enter your destination"
            leftIcon={<MapPin size={20} />}
          />

          {/* Row 2: Date & Time - Only for Scheduled */}
          {bookingType === "scheduled" && (
            <>
              <div style={{ position: "relative" }}>
                <Input
                  id="date-display"
                  type="text"
                  placeholder="Date"
                  value={date}
                  readOnly
                  leftIcon={<Calendar size={20} />}
                />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker();
                    } catch (err) {}
                  }}
                  className={styles.nativePicker}
                />
              </div>

              <div style={{ position: "relative" }}>
                <Input
                  id="time-display"
                  type="text"
                  placeholder="Time"
                  value={formatTimeDisplay(time)}
                  readOnly
                  leftIcon={<Clock size={20} />}
                />
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  onClick={(e) => {
                    try {
                      e.currentTarget.showPicker();
                    } catch (err) {}
                  }}
                  className={styles.nativePicker}
                />
              </div>
            </>
          )}

          {/* Vehicle & Passengers */}
          <Select
            id="vehicleType"
            options={vehicleOptions}
            leftIcon={<Car size={20} />}
          />

          <div className={styles.inputGroup}>
            <div className={styles.counterWrapper}>
              <div className={styles.iconLeft}><Users size={20} /></div>
              <span className={styles.counterLabel}>Passengers</span>
              <div className={styles.counterControls}>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className={styles.counterBtn}
                >
                  <Minus size={18} />
                </button>
                <span className={styles.counterValue}>{passengers}</span>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(10, passengers + 1))}
                  className={styles.counterBtn}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className={styles.contactGrid}>
          <Input
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User size={20} />}
            required
          />
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
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
            required
          />
          <Input
            id="phone"
            type="tel"
            placeholder="Mobile Number"
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
            required
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
              Search Available Rides
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      {/* Footer Text */}
      <div className={styles.footer}>
        <Image src="/icons/spark.svg" alt="Spark" width={16} height={16} />
        <span>Loved from 500K users</span>
      </div>
    </div>
    </>
  );
}
