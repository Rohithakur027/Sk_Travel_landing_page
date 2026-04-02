import Image from 'next/image';
import styles from './TeamSection.module.css';

const TEAM = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO & Founder',
    image: '/images/rajesh.png'
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Operations',
    image: '/images/priya.png'
  },
  {
    name: 'Arjun Patel',
    role: 'Fleet Manager',
    image: '/images/arjun.png'
  }
];

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className={styles.heading}>Meet Our Team</h2>
          <p className={styles.subheading}>
            Dedicated professionals committed to your transportation excellence
          </p>
        </div>

        <div className={styles.grid}>
          {TEAM.map((member, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
