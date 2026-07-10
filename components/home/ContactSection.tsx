import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from './ContactForm';
import { COMPANY_ADDRESS_LINES } from '@/lib/constants/company';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 bg-[rgb(254,253,248)] px-0 py-10 max-[400px]:py-10 md:py-16 max-md:px-0 max-md:py-12">
      <div className="mx-auto w-full max-w-[1480px] px-6 max-[400px]:px-3 max-md:px-6">
        <div className="mb-8 px-4 text-center md:mb-14 md:px-0">
          <h2 className="mb-4 font-sans text-[1.875rem] font-extrabold text-[#2D3142] max-[400px]:px-2 md:text-[3rem]">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[500px] text-base leading-[1.6] text-gray-500">
            Have questions? Our team is ready to help you with your transportation needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div className="order-1 flex flex-col rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:p-8 lg:p-12">
            <h3 className="mb-2 font-sans text-2xl font-extrabold text-[#2D3142]">Send us a Message</h3>
            <p className="mb-8 text-sm text-gray-500">Fill out the form below and we&apos;ll get back to you shortly</p>
            <ContactForm />
          </div>

          <div className="order-2 flex h-full flex-col gap-4 md:gap-8">
            <div className="relative mb-2 min-h-[180px] flex-1 overflow-hidden rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-[400px]:h-[180px] md:min-h-[300px]">
              <Image
                src="/images/getintouch.png"
                alt="Getting in touch with our team"
                fill
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.9),transparent)] px-6 pb-5 pt-12 text-white">
                <h4 className="mb-1 text-lg font-bold">We&apos;re Here to Help</h4>
                <p className="text-xs opacity-90">Our dedicated team is ready to assist you</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col items-center gap-4 rounded-[1.25rem] bg-white p-5 text-center shadow-[0_4px_14px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:text-left md:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-[rgba(255,210,63,0.3)] bg-[linear-gradient(135deg,rgba(255,210,63,0.15)_0%,rgba(255,210,63,0.08)_100%)] text-amber-400 sm:h-[4.5rem] sm:w-[4.5rem]">
                  <Phone size={30} />
                </div>
                <div className="flex flex-col sm:items-start">
                  <p className="mb-1 text-sm font-semibold capitalize text-[#6B7280]">Call Us</p>
                  <h4 className="mb-1 break-all font-sans text-base font-extrabold text-[#2D3142] sm:text-xl">+91 9886897555</h4>
                  <p className="text-sm text-gray-400">24/7 Operational Support</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-[1.25rem] bg-white p-5 text-center shadow-[0_4px_14px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:text-left md:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-[rgba(255,210,63,0.3)] bg-[linear-gradient(135deg,rgba(255,210,63,0.15)_0%,rgba(255,210,63,0.08)_100%)] text-amber-400 sm:h-[4.5rem] sm:w-[4.5rem]">
                  <Mail size={30} />
                </div>
                <div className="flex flex-col sm:items-start">
                  <p className="mb-1 text-sm font-semibold capitalize text-[#6B7280]">Email Us</p>
                  <h4 className="mb-1 break-all font-sans text-base font-extrabold text-[#2D3142] sm:text-xl">support@skvoyages.in</h4>
                  <p className="text-sm text-gray-400">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-[1.25rem] bg-white p-5 text-center shadow-[0_4px_14px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:text-left md:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-[rgba(255,210,63,0.3)] bg-[linear-gradient(135deg,rgba(255,210,63,0.15)_0%,rgba(255,210,63,0.08)_100%)] text-amber-400 sm:h-[4.5rem] sm:w-[4.5rem]">
                  <MapPin size={30} />
                </div>
                <div className="flex flex-col sm:items-start">
                  <p className="mb-1 text-sm font-semibold capitalize text-[#6B7280]">Visit Us</p>
                  <h4 className="mb-1 break-all font-sans text-base font-extrabold text-[#2D3142] sm:text-xl">{COMPANY_ADDRESS_LINES[0]}</h4>
                  <p className="text-sm text-gray-400">{COMPANY_ADDRESS_LINES[1]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
