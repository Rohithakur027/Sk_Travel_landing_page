"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';
import { submitSpecialBooking } from '@/lib/api-client';
import Pill from '@/components/ui/Pill';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}

const inputClassName =
  'mt-2 h-12 w-full rounded-[14px] border border-[#eef2f6] bg-[#fbfdff] px-4 text-[13px] text-[#2D3142] outline-none transition-all duration-200 ease-out placeholder:text-[#bfc9cf] focus:border-[var(--color-black)] focus:shadow-[0_0_0_2px_var(--color-black)]';
const textareaClassName =
  'mt-2 min-h-[140px] w-full rounded-[14px] border border-[#eef2f6] bg-[#fbfdff] px-4 py-3 text-[13px] text-[#2D3142] outline-none transition-all duration-200 ease-out placeholder:text-[#bfc9cf] focus:border-[var(--color-black)] focus:shadow-[0_0_0_2px_var(--color-black)]';

export default function CONTACT() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const isFormIncomplete =
    !formData.fullName.trim() ||
    !formData.company.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const names = formData.fullName.trim().split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '-';

      await submitSpecialBooking({
        first_name: firstName,
        last_name: lastName,
        company_name: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      showToast("success", "Your enquiry has been submitted! We'll be in touch shortly.");
      setFormData({ fullName: '', company: '', email: '', phone: '', message: '' });
    } catch (error) {
      showToast("error", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactItems = [
    {
      key: 'email',
      label: 'Email Us',
      text: (
        <>
          support@skvoyages.in
        </>
      ),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="2.5" y="4" width="19" height="14" rx="2.5" stroke="#FFD23F" strokeWidth="1.6" fill="none" />
          <path d="M3.5 6.5L12 12.2L20.5 6.5" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      key: 'phone',
      label: 'Call Us',
      text: (
        <>
          +91 9886897555
          <br />
          24/7 Operational Support
        </>
      ),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.27c1.12.37 2.33.57 3.56.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A19.92 19.92 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.23.2 2.44.57 3.56a1 1 0 0 1-.27 1l-2.2 2.2z" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      key: 'visit',
      label: 'Visit Us',
      text: (
        <>
          H.No.57, Shop No. 7, PAI Layout
          <br />
          6th Cross, Hulimavu Main Road, B.G. Road
          <br />
          Hulimavu, Bangalore - 560076
        </>
      ),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="12" cy="9" r="2.2" stroke="#FFD23F" strokeWidth="1.6" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pt-0">
      <header className="flex min-h-[420px] items-start justify-center bg-[#2D3142] px-6 pb-24 pt-[calc(var(--navbar-height)+2rem)] text-center md:min-h-[560px] md:pb-16 md:pt-[calc(var(--navbar-height)+2.4rem)]">
        <div className="mx-auto w-full max-w-[980px] px-4">
          <div className="mb-12 flex justify-center md:mb-12">
            <Pill>Get In Touch</Pill>
          </div>

          <h1 className="mb-7 text-center font-heading text-[2.7rem] font-black leading-[1.2] tracking-[-0.02em] md:text-[4.5rem] md:leading-[1.08]">
            <span className="block text-white">
              Let&apos;s Start Your
            </span>
            <span className="mt-2 block bg-[linear-gradient(171.05deg,#FFD23F_5.73%,#FFA726_94.27%)] bg-clip-text text-transparent md:mt-4">
              <span className="block whitespace-nowrap">Transportation</span>
              <span className="block">Journey</span>
            </span>
          </h1>

          <p className="mx-auto max-w-[48rem] text-sm leading-[1.5] text-white/50 md:text-[1.25rem] md:leading-[1.7]">
            <span>Ready to transform your corporate transportation? Reach out to us and</span>
            <br className="hidden md:block" />
            <span className="md:block">let&apos;s discuss your needs</span>
          </p>
        </div>
      </header>

      <div className="relative z-10 -mt-16 mx-auto w-full max-w-[1244px] bg-white px-4 pt-1 md:mt-0 md:bg-transparent md:pt-0">
        <div className="mx-auto my-6 grid w-full max-w-[890px] grid-cols-1 gap-8 md:my-10 lg:grid-cols-[minmax(0,494px)_minmax(0,360px)]">
          <form
            id="booking"
            className="flex w-full flex-col rounded-[32px] border-t border-t-black/5 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center justify-center rounded-[1.125rem] bg-[linear-gradient(180deg,#FED23F_0%,#FFA726_100%)] px-4 py-2 text-[0.9375rem] font-extrabold text-[#08121A] shadow-[0_6px_16px_rgba(249,115,22,0.12)]">
                Special Bookings
              </div>
              <h3 className="mb-2 text-[32px] font-extrabold leading-[48px] text-[#2D3142]">
                Send us a Message
              </h3>
              <p className="max-w-[375px] text-base leading-6 text-[#6B7280]">
                Fill out the form and our team will get back to you within 24 hours
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-[14px]">
              <label className="block text-[13px] font-semibold text-[#6B7280]">
                <span>
                  Full Name
                  <span className="ml-1 inline-block -translate-y-[0.15rem] align-text-top text-[0.6rem] text-red-500">*</span>
                </span>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </label>

              <label className="block text-[13px] font-semibold text-[#6B7280]">
                <span>
                  Company Name
                  <span className="ml-1 inline-block -translate-y-[0.15rem] align-text-top text-[0.6rem] text-red-500">*</span>
                </span>
                <input
                  name="company"
                  type="text"
                  placeholder="Enter your company name"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </label>

              <div className="flex flex-col gap-[14px] md:flex-row md:gap-4">
                <label className="block flex-1 text-[13px] font-semibold text-[#6B7280]">
                  <span>
                    Email
                    <span className="ml-1 inline-block -translate-y-[0.15rem] align-text-top text-[0.6rem] text-red-500">*</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </label>

                <label className="block flex-1 text-[13px] font-semibold text-[#6B7280]">
                  <span>
                    Phone
                    <span className="ml-1 inline-block -translate-y-[0.15rem] align-text-top text-[0.6rem] text-red-500">*</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 9886897555"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </label>
              </div>

              <label className="block text-[13px] font-semibold text-[#6B7280]">
                <span>
                  Message
                  <span className="ml-1 inline-block -translate-y-[0.15rem] align-text-top text-[0.6rem] text-red-500">*</span>
                </span>
                <textarea
                  name="message"
                  placeholder="Tell us about your transportation needs..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={textareaClassName}
                />
              </label>
            </div>

            <div className="mt-5 text-left">
              <button
                type="submit"
                className={[
                  'inline-flex w-full items-center justify-center gap-[10px] rounded-xl bg-[linear-gradient(180deg,#FED23F_0%,#FFA726_100%)] px-5 py-3.5 text-[15px] font-extrabold text-[#08121A] shadow-[0_12px_30px_rgba(255,153,51,0.18)] transition-all duration-200 ease-out hover:-translate-y-px',
                  isFormIncomplete ? 'cursor-not-allowed bg-[rgba(255,200,57,0.9)] bg-none text-[#111827] shadow-none hover:translate-y-0' : '',
                ].join(' ')}
                disabled={isLoading || isFormIncomplete}
              >
                <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                {!isLoading && (
                  <span className="inline-flex items-center justify-center" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 21L23 12L2 3v7l15 2-15 2v7z" fill="#08121A" opacity="0.95" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          <aside className="flex flex-col gap-4">
            <div className="flex flex-col rounded-[28px] bg-white px-8 pb-6 pt-8 shadow-[0_18px_40px_rgba(2,6,23,0.07)] md:px-10 md:pt-9">
              <h3 className="mb-5 text-[1.85rem] font-extrabold leading-tight text-[#111827] md:text-[2rem]">Contact Information</h3>

              {contactItems.map((item) => (
                <div key={item.key} className="flex items-start gap-4 py-5 last:pb-0">
                  <div className="mt-1 flex h-16 w-16 flex-none items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,rgba(255,210,63,0.16)_0%,rgba(255,210,63,0.08)_100%)] shadow-[0_10px_28px_rgba(2,6,23,0.06)]">
                    {item.icon}
                  </div>
                  <div className="flex min-h-20 flex-col justify-center">
                    <div className="text-[0.98rem] font-extrabold text-[#2D3142] md:text-[1.05rem]">{item.label}</div>
                    <div className="mt-2 text-[0.92rem] leading-[1.55] text-[#64748b] md:text-[0.96rem]">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-0">
              <Image src="/images/classydriver.png" alt="vehicle" width={460} height={220} className="block h-auto w-full rounded-xl object-cover" />
            </div>
          </aside>
        </div>
      </div>

      <section className="mt-10 bg-white px-4 py-[60px]">
        <div className="mx-auto w-full max-w-[1244px]">
          <h2 className="mx-auto mb-2 max-w-[1052px] text-center text-[32px] font-extrabold leading-[42px] text-[#2D3142] md:text-[48px] md:leading-[63px]">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mb-6 text-center text-[13px] leading-5 text-[#6b7280] md:w-[600px] md:text-sm md:leading-[27px]">
            Quick answers to questions you may have
          </p>
          <div className="mx-auto max-w-[1052px]">
            {[
              ['How do I get started with SK Voyages?', "Simply fill out the contact form above or call us directly. We'll schedule a consultation to understand your needs and provide a customized solution."],
              ['What areas do you service?', "We currently operate in Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, and Chennai. We're expanding to more cities across India."],
              ['Do you offer customized transportation solutions?', 'Yes — we understand every business is unique. We create tailored transportation plans based on your specific requirements, routes, and schedules.'],
              ['How do you ensure driver quality and safety?', 'All our drivers undergo thorough background verification, police checks, and professional training. Vehicles are regularly maintained and inspected.'],
              ['What is your pricing model?', 'We offer flexible pricing based on your needs — monthly contracts, per-trip basis, or custom packages. Contact us for a detailed quote.'],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="group mb-3 rounded-xl bg-white px-[18px] py-[14px] shadow-[0_6px_20px_rgba(2,6,23,0.04)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-bold leading-[27px] text-[#2D3142] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#fff7df] text-[#f59e0b] transition-transform duration-200 group-open:rotate-180">
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="mt-2 text-base text-[#6b7280]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
