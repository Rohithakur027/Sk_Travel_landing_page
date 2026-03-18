'use client';

import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { submitContact } from '@/lib/contact.api';
import type { ContactFormData } from '@/types/common.types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitContact(formData);
      setSuccess(true);
    } catch {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" name="name" label="Name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
      <Input id="email" name="email" type="email" label="Email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        />
      </div>
      {success && <p className="text-green-600 text-sm font-medium">Message sent successfully!</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
