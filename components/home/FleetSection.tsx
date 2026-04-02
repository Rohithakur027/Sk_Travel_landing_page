import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './FleetSection.module.css';

export default function FleetSection() {
  return (
    <section id="fleet" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Premium Fleet</h2>
          <p className={styles.sectionSubtitle}>Choose from our diverse range of luxury vehicles tailored for every corporate need</p>
        </div>

        
        <div className={styles.bentoGrid}>
          {/* ROW 1 */}
          <div className={styles.card}>
            <Image 
              src="/images/luxurysuv.jpeg" 
              alt="Luxury SUVs" 
              fill 
              className={styles.bgImg} 
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3>Luxury SUVs</h3>
              <p>Spacious rides for 1-6 passengers</p>
            </div>
          </div>
          
          <div className={styles.card}>
            <Image 
              src="/images/corporateshuttles.jpeg" 
              alt="Corporate Shuttles" 
              fill 
              className={styles.bgImg} 
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3>Corporate Shuttles</h3>
              <p>Group transportation solutions</p>
            </div>
          </div>
          
          {/* ROW 2 */}
          <div className={styles.card}>
            <Image 
              src="/images/expertdrivers.jpeg" 
              alt="Tempo Drivers" 
              fill 
              className={styles.bgImg} 
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3>Tempo Drivers</h3>
              <p>Group transportation solutions</p>
            </div>
          </div>

          <div className={styles.card}>
            <Image 
              src="/images/executivesedan.png" 
              alt="Executive Sedans" 
              fill 
              className={styles.bgImg} 
              priority
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <span className={styles.featuredTag}>Featured</span>
              <h3>Executive Sedans</h3>
              <p>Premium comfort for 1-4 passengers</p>
              <button className={styles.viewDetailsBtn}>
                View Details <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
