import React from 'react';
import Image from 'next/image';
import { Star, Shield, Clock, ArrowRight } from 'lucide-react';
import styles from './ExperienceSection.module.css';

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Experience Premium Corporate Transportation</h2>
          <p className={styles.sectionSubtitle}>Discover why leading companies trust SK Voyage for their transportation needs</p>
        </div>

        
        <div className={styles.bentoGrid}>
          {/* ROW 1 */}
          <div className={styles.premiumComfort}>
            <div className={styles.card}>
              <Image src="/images/premiumcomforts.png" alt="Premium Comfort" fill className={styles.bgImg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3>Premium Comfort</h3>
                <p>Experience luxury travel with our fleet of premium vehicles featuring leather interiors and modern amenities</p>
              </div>
            </div>
          </div>
          
          <div className={styles.rightStack}>
            <div className={styles.card}>
              <Image src="/images/expertdrivers.png" alt="Expert Drivers" fill className={styles.bgImg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3>Expert Drivers</h3>
                <p>Professionally trained chauffeurs</p>
              </div>
            </div>
            
            <div className={styles.yellowCard}>
              <div className={styles.scoreRow}>
                <div className={styles.starBox}>
                  <Star fill="currentColor" size={28} />
                </div>
                <span className={styles.scoreText}>4.9/5</span>
              </div>
              <div>
                <h4>Customer Satisfaction</h4>
                <p>Based on 10,000+ verified reviews from our corporate clients</p>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className={styles.cities25}>
            <div className={styles.card}>
              <Image src="/images/25+cities.png" alt="25+ Cities" fill className={styles.bgImg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3>25+ Cities</h3>
                <p>Nationwide coverage</p>
              </div>
            </div>
          </div>

          <div className={styles.fullyInsured}>
            <div className={styles.card}>
              <Image src="/images/fullyensured.png" alt="Fully Insured" fill className={styles.bgImg} />
              <div className={styles.overlayOrange} />
              <div className={styles.centerContent}>
                <div className={styles.shieldBox}>
                  <Shield fill="currentColor" size={32} color="#111827" />
                </div>
                <h3>Fully Insured</h3>
                <p>Complete protection for peace of mind</p>
              </div>
            </div>
          </div>

          <div className={styles.airportTransfers}>
            <div className={styles.card}>
              <Image src="/images/airporttransfers.png" alt="Airport Transfers" fill className={styles.bgImg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3>Airport Transfers</h3>
                <p>24/7 pickup & drop service</p>
              </div>
            </div>
          </div>

          {/* ROW 3 */}
          <div className={styles.builtForTeams}>
            <div className={styles.card}>
              <Image src="/images/builtforteam.png" alt="Built for Teams" fill className={styles.bgImg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3>Built for Teams</h3>
                <p>Seamless group transportation for corporate events and daily commutes</p>
                <button className={styles.learnMoreBtn}>
                  Learn More <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.premiumFleet}>
            <div className={styles.card}>
              <Image src="/images/premiumfleet.png" alt="Premium Fleet" fill className={styles.bgImg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h3>Premium Fleet</h3>
                <p>Latest models & luxury brands</p>
              </div>
            </div>
          </div>

          <div className={styles.always247}>
            <div className={styles.darkCard}>
              <div className={styles.clockBox}>
                <Clock size={28} />
              </div>
              <h3 className={styles.darkScore}>24/7</h3>
              <h4 className={styles.darkSubtitle}>Always Available</h4>
              <p className={styles.darkText}>Round-the-clock service for all your transportation needs</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
