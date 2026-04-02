'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { contactApi, type ContactFormData } from '@/lib/contact.api';
import styles from './ContactForm.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const BRANDS = [
  'Maruti Suzuki',
  'Hyundai',
  'Honda',
  'Tata',
  'Toyota',
  'Kia',
  'Mahindra',
  'Renault',
  'Force',
];

const MODELS = [
  'Dzire (Tour S)',
  'Innova Crysta',
  'Aura',
  'Traveller',
  'WagonR',
  'Swift',
  'Alto',
  'Ertiga',
  'Eeco',
  'Innova Hycross',
  'Xcent Prime',
  'Creta',
  'Venue',
  'Tiago',
  'Zest',
  'Tigor',
  'Nexon',
  'Indigo',
  'Marazzo',
  'Bolero Neo',
  'Scorpio',
  'XUV700',
  'Carens',
  'Carnival',
  'Amaze',
  'City',
  'Triber',
  'Duster',
];

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const modelSuggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (modelSuggestionsRef.current && !modelSuggestionsRef.current.contains(event.target as Node)) {
        setShowModelSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBrands = formData.vehicleManufacturer
    ? BRANDS.filter((b) =>
        b.toLowerCase().includes(formData.vehicleManufacturer.toLowerCase())
      )
    : BRANDS.slice(0, 4);

  const filteredModels = formData.vehicleModel
    ? MODELS.filter((m) =>
        m.toLowerCase().includes(formData.vehicleModel.toLowerCase())
      )
    : MODELS.slice(0, 4);

  const handleBrandSelect = (brand: string) => {
    setFormData((prev) => ({ ...prev, vehicleManufacturer: brand }));
    setShowSuggestions(false);
  };

  const handleModelSelect = (model: string) => {
    setFormData((prev) => ({ ...prev, vehicleModel: model }));
    setShowModelSuggestions(false);
  };

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
      {/* User Type Toggle */}
      <div className={styles.toggle}>
        <div 
          className={`${styles.slider} ${
            formData.userType === 'company' ? styles.companyActive : styles.driverActive
          }`}
        />
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, userType: 'company' }))}
          className={`${styles.toggleBtn} ${
            formData.userType === 'company' ? styles.toggleBtnActive : ""
          }`}
        >
          As Company
        </button>
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, userType: 'driver' }))}
          className={`${styles.toggleBtn} ${
            formData.userType === 'driver' ? styles.toggleBtnActive : ""
          }`}
        >
          As Driver
        </button>
      </div>

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
          <div className={styles.suggestionsContainer} ref={suggestionsRef}>
            <Input
              id="vehicleManufacturer"
              name="vehicleManufacturer"
              placeholder="Vehicle Manufacturer *"
              value={formData.vehicleManufacturer}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              autoComplete="off"
              required
            />
            {showSuggestions && (
              <ul className={styles.suggestionsList}>
                {filteredBrands.map((brand) => (
                  <li
                    key={brand}
                    className={styles.suggestionItem}
                    onMouseDown={() => handleBrandSelect(brand)}
                  >
                    {brand}
                  </li>
                ))}
                {filteredBrands.length === 0 && (
                   <li className={styles.suggestionItem} style={{ cursor: 'default', color: '#9CA3AF' }}>
                    No brands found
                   </li>
                )}
              </ul>
            )}
          </div>
          <div className={styles.suggestionsContainer} ref={modelSuggestionsRef}>
            <Input
              id="vehicleModel"
              name="vehicleModel"
              placeholder="Vehicle Model *"
              value={formData.vehicleModel}
              onChange={handleChange}
              onFocus={() => setShowModelSuggestions(true)}
              autoComplete="off"
              required
            />
             {showModelSuggestions && (
              <ul className={styles.suggestionsList}>
                {filteredModels.map((model) => (
                  <li
                    key={model}
                    className={styles.suggestionItem}
                    onMouseDown={() => handleModelSelect(model)}
                  >
                    {model}
                  </li>
                ))}
                {filteredModels.length === 0 && (
                   <li className={styles.suggestionItem} style={{ cursor: 'default', color: '#9CA3AF' }}>
                    No models found
                   </li>
                )}
              </ul>
            )}
          </div>
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
