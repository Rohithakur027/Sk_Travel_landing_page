import Image from 'next/image';
import styles from './StorySection.module.css';

export default function StorySection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Left Column: Image */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/aboutstory.jpeg"
                alt="Story Image"
                fill
                className={styles.image}
              />
            </div>
          </div>

          {/* Right Column: Text */}
          <div className={styles.textCol}>
            <div className={styles.badge}>Our Story</div>
            <h2 className={styles.heading}>Building Trust Through Excellence</h2>
            
            <div className={styles.paragraphs}>
              <p>
                Founded in 2015, SK Voyages emerged from a simple vision: to transform corporate employee transportation in India. We recognized that businesses needed a reliable, professional, and scalable solution for their daily commute challenges.
              </p>
              <p>
                Over the years, we've grown from a small fleet serving local businesses to a comprehensive transportation partner for enterprises across major Indian cities. Our commitment to safety, punctuality, and customer satisfaction has made us the preferred choice for over 500+ companies.
              </p>
              <p>
                Today, SK Voyages operates with a fleet of modern, well-maintained vehicles driven by thoroughly verified and professionally trained drivers, ensuring every journey is safe and comfortable.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
