const LEADERS = [
  {
    initials: 'H',
    name: 'Hemantha Kumara M',
    color: '#f59e0b',
    message:
      "Running seamless operations is the backbone of great travel experiences. My focus is on ensuring that every vehicle is road-ready, every driver is trained, and every booking is fulfilled without a hitch. Behind the scenes, our team works tirelessly so that the only thing you experience is a smooth, on-time ride. We take pride in the details — because the details are what make the difference.",
  },
  {
    initials: 'R',
    name: 'Ravi S',
    color: '#f59e0b',
    message:
      "At SK Voyages, our mission has always been simple — make every journey comfortable, reliable, and stress-free. We built this company with the belief that transportation should never be a burden. Whether you're heading to a wedding, a corporate event, or exploring the country, we want you to arrive feeling taken care of. That's the promise I make to every traveler who trusts us.",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#f9fafb] px-0 pb-24 pt-20 text-center">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-16">
        <div className="mx-auto mb-16 max-w-[48rem]">
          <h2 className="mb-4 font-heading text-[2.25rem] font-extrabold text-[#1f2937] md:text-[2.75rem]">
            A Message From Our Team
          </h2>
          <p className="text-[1.125rem] leading-[1.6] text-[#6b7280]">
            The vision and values behind SK Travels, in the words of those who built it
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {LEADERS.map((leader) => (
            <div
              key={leader.name}
              className="flex flex-col items-center rounded-3xl bg-white px-8 py-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-5">
                <div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-[2rem] font-extrabold tracking-[0.02em] text-white"
                  style={{ backgroundColor: leader.color }}
                >
                  {leader.initials}
                </div>
              </div>
              <div className="flex w-full flex-col items-center">
                <h3 className="mb-1 font-heading text-[1.375rem] font-extrabold text-[#1f2937]">
                  {leader.name}
                </h3>
                <span className="my-5 block h-[3px] w-10 rounded-[2px] bg-[linear-gradient(90deg,#f59e0b,#d97706)]" />
                <blockquote className="m-0 text-left text-[0.975rem] italic leading-[1.75] text-[#4b5563]">
                  <span className="mx-[0.15rem] text-[1.25rem] font-bold not-italic text-[#d1d5db]">&ldquo;</span>
                  {leader.message}
                  <span className="mx-[0.15rem] text-[1.25rem] font-bold not-italic text-[#d1d5db]">&rdquo;</span>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
