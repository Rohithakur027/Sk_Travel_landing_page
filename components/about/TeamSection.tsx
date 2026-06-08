import styles from './TeamSection.module.css';

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
      "At SK Travels, our mission has always been simple — make every journey comfortable, reliable, and stress-free. We built this company with the belief that transportation should never be a burden. Whether you're heading to a wedding, a corporate event, or exploring the country, we want you to arrive feeling taken care of. That's the promise I make to every traveler who trusts us.",
  },
];

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className="container">

        <div className={styles.header}>
          <h2 className={styles.heading}>A Message From Our Team</h2>
          <p className={styles.subheading}>
            The vision and values behind SK Travels, in the words of those who built it
          </p>
        </div>

        <div className={styles.grid}>
          {LEADERS.map((leader, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <div
                  className={styles.avatar}
                  style={{ backgroundColor: leader.color }}
                >
                  {leader.initials}
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{leader.name}</h3>
                <span className={styles.divider} />
                <blockquote className={styles.message}>
                  <span className={styles.quoteIcon}>&ldquo;</span>
                  {leader.message}
                  <span className={styles.quoteIcon}>&rdquo;</span>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
