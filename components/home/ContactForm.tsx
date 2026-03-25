'use client';
import { useState } from 'react';
import Image from 'next/image';
import { contactApi, type ContactFormData } from '@/lib/contact.api';
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
  userType: 'company',
  email: '',
  phone: '',
  company: '',
  numEmployees: '',
  vehicleManufacturer: '',
  vehicleModel: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const payload: ContactFormData = {
        contact_first_name: formData.firstName,
        contact_last_name: formData.lastName,
        user_type: formData.userType,
        company_name: formData.userType === 'company' ? formData.company : '',
        num_employees: formData.userType === 'company' ? formData.numEmployees : '',
        vehicle_manufacturer: formData.userType === 'driver' ? formData.vehicleManufacturer : '',
        vehicle_model: formData.userType === 'driver' ? formData.vehicleModel : '',
        contact_email: formData.email,
        contact_phone: formData.phone,
        message: formData.message,
      };
      await contactApi.send(payload);
      setSuccess(true);
      setFormData(INITIAL);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successEmoji}>✅</div>
        <p className={styles.successTitle}>Message Sent!</p>
        <p className={styles.successSub}>We'll get back to you shortly.</p>
        <button onClick={() => setSuccess(false)} className={styles.resetBtn}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
      <div className={styles.formGridSingle}>
        <div className={styles.inputWrapper}>
          <select
            id="userType"
            name="userType"
            className={styles.input}
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="company">As Company</option>
            <option value="driver">As Driver</option>
          </select>
        </div>
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

      {formData.userType === 'company' ? (
        <div className={styles.formGrid}>
          <Input
            id="company"
            name="company"
            placeholder="Company Name *"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <Input
            id="numEmployees"
            name="numEmployees"
            type="number"
            placeholder="No. of Employees *"
            value={formData.numEmployees}
            onChange={handleChange}
            required
          />
        </div>
      ) : (
        <div className={styles.formGrid}>
          <Input
            id="vehicleManufacturer"
            name="vehicleManufacturer"
            placeholder="Vehicle Manufacturer *"
            value={formData.vehicleManufacturer}
            onChange={handleChange}
            required
          />
          <Input
            id="vehicleModel"
            name="vehicleModel"
            placeholder="Vehicle Model *"
            value={formData.vehicleModel}
            onChange={handleChange}
            required
          />
        </div>
      )}
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
      {error && (
        <p className={styles.errorBox}>
          {error}
        </p>
      )}
      <button type="submit" disabled={isLoading} className={styles.btnPrimary}>
        {isLoading ? 'Sending...' : (
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
