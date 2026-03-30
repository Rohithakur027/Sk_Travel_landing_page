"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Calendar, Clock, Car, Users, ArrowRight } from "lucide-react";
import styles from "./BookingForm.module.css";

// Local sub-components to reduce dependencies
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

const Input = ({ id, placeholder, leftIcon, ...props }: InputProps) => (
  <div className={styles.inputGroup}>
    <div className={styles.inputWrapper}>
      {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}
      <input
        id={id}
        placeholder={placeholder}
        className={`${styles.input} ${leftIcon ? styles.hasIcon : ""}`}
        {...props}
      />
    </div>
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
];

const passengerOptions = [
  { value: "", label: "Number of passengers" },
  { value: "1", label: "1 Passenger" },
  { value: "2", label: "2 Passengers" },
  { value: "3", label: "3 Passengers" },
  { value: "4", label: "4 Passengers" },
  { value: "5", label: "5+ Passengers" },
];

const optionOptions = [
  { value: "", label: "Select option" },
  { value: "one-way", label: "One Way" },
  { value: "round-trip", label: "Round Trip" },
];

export default function BookingForm() {
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">(
    "scheduled",
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proceed to search or next step
    console.log("Search initiated");
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

      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {/* Row 1 */}
          <Input
            id="destination"
            placeholder="Enter your destination"
            leftIcon={<MapPin size={20} />}
          />
          <Select
            id="option"
            options={optionOptions}
            leftIcon={<MapPin size={20} />}
          />
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

          {/* Row 2 */}
          <div style={{ position: "relative" }}>
            <Input
              id="time-display"
              type="text"
              placeholder="Time"
              value={time}
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
          <Select
            id="vehicleType"
            options={vehicleOptions}
            leftIcon={<Car size={20} />}
          />
          <Select
            id="passengers"
            options={passengerOptions}
            leftIcon={<Users size={20} />}
          />
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
