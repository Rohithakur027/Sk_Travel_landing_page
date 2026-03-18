'use client';
import { useState } from 'react';
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
  company: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const payload: ContactFormData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: formData.company || 'New Inquiry',
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
        <Input
          id="company"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGridSingle}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGridSingle}>
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
            Send Message <span className={styles.btnArrow}>&gt;</span>
          </>
        )}
      </button>
    </form>
  );
}
