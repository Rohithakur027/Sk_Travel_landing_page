"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/lib/context/ToastContext";
import { submitSpecialBooking } from "@/lib/api-client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const inputClassName =
  "w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] p-5 text-base text-gray-800 outline-none transition-all duration-200 ease-out placeholder:text-gray-400 focus:border-[#0a0b0d] focus:bg-white focus:shadow-[0_0_0_2px_#0a0b0d] max-[400px]:p-4";

const Input = ({ id, error, ...props }: InputProps) => (
  <div>
    <input
      id={id}
      className={`${inputClassName} ${error ? "border-red-500" : ""}`}
      {...props}
    />
  </div>
);

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitSpecialBooking({
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      showToast("success", "Your enquiry has been submitted! We'll be in touch shortly.");
      setFormData(INITIAL);
    } catch (error) {
      showToast("error", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const isFormIncomplete =
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.company.trim() ||
    !formData.message.trim();

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-grow flex-col gap-3 max-[400px]:gap-3">
      <div className="mb-2 inline-flex w-fit items-center justify-center rounded-[1.125rem] bg-[linear-gradient(180deg,#FED23F_0%,#FFA726_100%)] px-4 py-2 text-[0.9375rem] font-extrabold text-[#08121A] shadow-[0_6px_16px_rgba(249,115,22,0.12)]">
        Special Bookings
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
        <Input
          id="firstName"
          name="firstName"
          placeholder="First Name *"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          id="lastName"
          name="lastName"
          placeholder="Last Name *"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Input
          id="company"
          name="company"
          placeholder="Company Name *"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-grow flex-col">
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Message *"
          className="min-h-40 flex-grow resize-none rounded-lg border border-[#e5e7eb] bg-[#fafafa] p-5 text-base text-gray-800 outline-none transition-all duration-200 ease-out placeholder:text-gray-400 focus:border-[#0a0b0d] focus:bg-white focus:shadow-[0_0_0_2px_#0a0b0d] max-[400px]:p-4"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || isFormIncomplete}
        className={[
          "group mt-auto inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[linear-gradient(135deg,#FFD23F_0%,#FFA726_100%)] p-5 text-lg font-bold text-[rgba(45,49,66,1)] shadow-[0_10px_15px_-3px_rgba(255,210,63,0.2)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#FFD23F_0%,#FFB74D_100%)] hover:shadow-[0_8px_20px_1px_rgba(125,125,125,0.35)] active:translate-y-0 active:shadow-[0_5px_10px_-3px_rgba(255,167,38,0.2)]",
          isFormIncomplete ? "cursor-not-allowed bg-[rgba(255,200,57,0.9)] bg-none text-[#111827] shadow-none hover:translate-y-0 hover:shadow-none" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isLoading ? (
          "Sending..."
        ) : isFormIncomplete ? (
          "Send Message"
        ) : (
          <>
            Send Message
            <Image
              src="/icons/SendIcon.svg"
              alt="Send icon"
              width={20}
              height={20}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
}
