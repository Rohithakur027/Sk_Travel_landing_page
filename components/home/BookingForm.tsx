"use client";

import { useState, forwardRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  ArrowRight,
  Navigation,
  Plus,
  Minus,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingForm.module.css";

// Local sub-components to reduce dependencies
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  placeholder,
  leftIcon,
  className,
  ...props
}, ref) => (
  <div className={styles.inputGroup}>
    <div className={styles.inputWrapper}>
      {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}
      <input
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={`${styles.input} ${leftIcon ? styles.hasIcon : ""} ${className || ""}`}
        {...props}
      />
    </div>
  </div>
));
Input.displayName = "Input";

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

export default function BookingForm() {
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">(
    "scheduled",
  );
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proceed to search or next step
    console.log("Search initiated", { bookingType, date, time, passengers });
  };

  return (
    <div className={styles.card}>
      {/* Toggle */}
      <div className={styles.toggle}>
        <div
          className={`${styles.slider} ${
            bookingType === "instant"
              ? styles.instantActive
              : styles.scheduledActive
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
        <div
          className={`${styles.grid} ${
            bookingType === "instant"
              ? styles.instantGrid
              : styles.scheduledGrid
          }`}
        >
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
              <DatePicker
                selected={date}
                onChange={(newDate: Date | null) => setDate(newDate)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Date"
                customInput={
                  <Input
                    id="date"
                    leftIcon={<Calendar size={20} />}
                    className={styles.dateInput}
                  />
                }
                wrapperClassName={styles.datePickerWrapper}
                portalId="root-portal"
                popperClassName={styles.customPopper}
              />
              <DatePicker
                selected={time}
                onChange={(newTime: Date | null) => setTime(newTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Time"
                customInput={
                  <Input
                    id="time"
                    leftIcon={<Clock size={20} />}
                    className={styles.timeInput}
                  />
                }
                wrapperClassName={styles.datePickerWrapper}
                portalId="root-portal"
                popperClassName={styles.customPopper}
              />
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
              <div className={styles.iconLeft}>
                <Users size={20} />
              </div>
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

        {/* Submit Button */}
        <button type="submit" className={styles.submitBtn}>
          Search Available Rides
          <ArrowRight size={20} />
        </button>
      </form>

      {/* Footer Text */}
      <div className={styles.footer}>
        <Image src="/icons/spark.svg" alt="Spark" width={16} height={16} />
        <span>Loved from 500K users</span>
      </div>
    </div>
  );
}
