import React from 'react'
import Image from 'next/image'
import styles from './FeaturesPage.module.css'

const FEATURE_CARDS = [
  { title: 'Smart Scheduling', desc: 'Automated scheduling with recurring trip support and flexible booking options', icon: '/Container (12).png' },
  { title: 'Mobile App', desc: 'User-friendly mobile applications for employees and administrators', icon: '/Container (13).png' },
  { title: 'Analytics Dashboard', desc: 'Detailed insights on usage, costs, and performance metrics', icon: '/Container (14).png' },
  { title: 'Driver Verification', desc: 'Comprehensive background checks and professional training for all drivers', icon: '/Container (15).png' },
  { title: 'SOS & Safety', desc: 'Emergency alert system with instant support access for passenger safety', icon: '/Container (16).png' },
  { title: 'Automated Billing', desc: 'Transparent invoicing with detailed trip breakdowns and cost allocation', icon: '/Container (17).png' },
  { title: 'Route Optimization', desc: 'AI-powered routing to minimize travel time and maximize efficiency', icon: '/Container (18).png' },
  { title: 'Multi-Location Support', desc: 'Manage transportation across multiple offices and pickup points', icon: '/Container (19).png' },
  { title: 'Vehicle Variety', desc: 'Multiple vehicle types from sedans to buses for different needs', icon: '/Container (20).png' },
]

export default function FeaturesPage() {
  return (
    <section className={styles.section}>
      <div className={styles.headerBand}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.pillImage}>
              <Image src={'/Container (10).png'} alt="Platform Features" width={164} height={46} />
            </div>
            <h1 className={styles.title}>
              <span>Advanced Features for</span>
              <br />
              <span className={styles.titleGold}>Modern Transportation</span>
            </h1>
            <p className={styles.lead}>Discover the technology and features that make SK Voyage the smart choice for corporate transportation</p>
          </div>
        </div>
      </div>
      
      

      <div className={styles.container}>
        <div className={styles.heroRow}>
          <div className={styles.heroText}>
            <div className={styles.smallPill}>Real-Time Intelligence</div>
            <h2 className={styles.heroTitle}>Track Every Journey in<br/>Real-Time</h2>
            <p className={styles.heroDesc}>Our advanced GPS tracking system allows you to monitor all your vehicles in real-time. Know exactly where your employees are and when they'll arrive at their destination.</p>

            <ul className={styles.checkList}>
              <li>Live GPS Tracking</li>
              <li>ETA Updates</li>
              <li>Route History</li>
              <li>Driver Details</li>
            </ul>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.imageCard}>
              <Image src={'/Container (11).png'} alt="Traffic" fill className={styles.innerImage} priority />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitleBand}>
        <div className={styles.container}>
          <div className={styles.sectionTitleWrap}>
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <p className={styles.sectionLead}>Comprehensive features designed to make corporate transportation<br/>effortless</p>
          </div>

          <div className={styles.cardsGrid}>
            {FEATURE_CARDS.map((c, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.cardIcon}><Image src={c.icon} alt={c.title} width={56} height={56} /></div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

        <div className={styles.container}>
        <div className={styles.heroRow}>
          <div className={styles.heroImage}>
            <div className={styles.imageCard}>
              <Image src={'/Container (21).png'} alt="Car" fill className={styles.innerImage} priority />
            </div>
          </div>

          <div className={styles.heroText}>
            <div className={styles.smallPill}>
              <Image src={'/Container (22).png'} alt="Safety First" width={104} height={36} />
            </div>
            <h2 className={styles.heroTitle}>Your Safety is Our Priority</h2>
            <p className={styles.heroDesc}>We implement comprehensive safety measures to ensure every journey is secure and comfortable for your employees.</p>

            <div className={styles.stackCards}>
              <div className={styles.stackCard}>
                <div className={styles.stackIcon}><Image src={'/Container (29).png'} alt="Background Verified Drivers" width={48} height={48} /></div>
                <div>
                  <h4 className={styles.stackTitle}>Background Verified Drivers</h4>
                  <p className={styles.stackDesc}>Every driver undergoes thorough police verification and background checks</p>
                </div>
              </div>

              <div className={styles.stackCard}>
                <div className={styles.stackIcon}><Image src={'/Container (29).png'} alt="Regular Vehicle Maintenance" width={48} height={48} /></div>
                <div>
                  <h4 className={styles.stackTitle}>Regular Vehicle Maintenance</h4>
                  <p className={styles.stackDesc}>All vehicles undergo regular inspections and maintenance checks</p>
                </div>
              </div>

              <div className={styles.stackCard}>
                <div className={styles.stackIcon}><Image src={'/Container (29).png'} alt="24/7 Emergency Support" width={48} height={48} /></div>
                <div>
                  <h4 className={styles.stackTitle}>24/7 Emergency Support</h4>
                  <p className={styles.stackDesc}>Round-the-clock support team available for any emergency situations</p>
                </div>
              </div>

              <div className={styles.stackCard}>
                <div className={styles.stackIcon}><Image src={'/Container (29).png'} alt="Real-Time Ride Sharing" width={48} height={48} /></div>
                <div>
                  <h4 className={styles.stackTitle}>Real-Time Ride Sharing</h4>
                  <p className={styles.stackDesc}>Share your trip details with family or colleagues for added security</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.poweredBand}>
        <div className={styles.poweredInner}>
          <h3 className={styles.poweredTitle}>Powered by Advanced Technology</h3>
          <p className={styles.poweredLead}>Built on cutting-edge technology to deliver reliable and efficient service</p>

          <div className={styles.poweredGrid}>
            <div className={styles.poweredItem}>
              <div className={styles.poweredIcon}><Image src={'/Container (30).png'} alt="Cloud Infrastructure" width={64} height={64} /></div>
              <div className={styles.poweredLabel}>Cloud Infrastructure</div>
              <div className={styles.poweredSubLabel}>99.9% uptime guaranteed</div>
            </div>
            <div className={styles.poweredItem}>
              <div className={styles.poweredIcon}><Image src={'/Container (31).png'} alt="AI Routing" width={64} height={64} /></div>
              <div className={styles.poweredLabel}>AI Routing</div>
              <div className={styles.poweredSubLabel}>Smart traffic prediction</div>
            </div>
            <div className={styles.poweredItem}>
              <div className={styles.poweredIcon}><Image src={'/Container (32).png'} alt="Mobile First" width={64} height={64} /></div>
              <div className={styles.poweredLabel}>Mobile First</div>
              <div className={styles.poweredSubLabel}>iOS & Android apps</div>
            </div>
            <div className={styles.poweredItem}>
              <div className={styles.poweredIcon}><Image src={'/Container (33).png'} alt="Data Security" width={64} height={64} /></div>
              <div className={styles.poweredLabel}>Data Security</div>
              <div className={styles.poweredSubLabel}>Bank-level encryption</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ctaBox}>
        <h3 className={styles.sectionTitle}>Experience These Features</h3>
        <p className={styles.sectionLead}>Schedule a demo to see how our platform can transform your<br/>corporate transportation</p>
        <div style={{marginTop:24}}>
          <button className={styles.ctaBtn}>Request a Demo →</button>
        </div>
      </div>

    </section>
  )
}
