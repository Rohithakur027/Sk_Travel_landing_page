import BookingForm from '@/components/forms/BookingForm';

export default function BookingPage() {
  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Book a Ride</h1>
        <BookingForm />
      </div>
    </section>
  );
}
