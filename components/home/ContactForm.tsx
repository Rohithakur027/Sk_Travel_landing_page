"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/lib/context/ToastContext';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from './ContactForm.module.css';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}


const Input = ({ id, error, ...props }: InputProps) => (
  <div className={styles.inputWrapper}>
    <input
      id={id}
      className={`${styles.input} ${error ? styles.inputError : ''}`}
      {...props}
    />
  </div>
);

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

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
      const response = await fetch('/api/public/special-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          company_name: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.errors?.[0] || 'Submission failed');
      }
      showToast("success", "Your enquiry has been submitted! We'll be in touch shortly.");
      setFormData(INITIAL);
    } catch (err: any) {
      showToast("error", err.message || "Something went wrong. Please try again.");
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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.specialBookingBadge}>Special Bookings</div>

      <div className={styles.formGrid}>
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

      <div className={styles.formGrid}>
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

      <div className={styles.formGridSolo}>
        <Input
          id="company"
          name="company"
          placeholder="Company Name *"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.textareaWrapper}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Message *"
          className={styles.textarea}
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading || isFormIncomplete} 
        className={`${styles.btnPrimary} ${isFormIncomplete ? styles.btnDisabled : ''}`}
      >
        {isLoading ? 'Sending...' : isFormIncomplete ? 'Send Message' : (
          <>
            Send Message 
            <Image 
              src="/icons/SendIcon.svg" 
              alt="Send icon" 
              width={20} 
              height={20} 
              className={styles.sendIcon} 
            />
          </>
        )}
      </button>
    </form>
  );
}
