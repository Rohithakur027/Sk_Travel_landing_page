import React from 'react';

const STATS = [
  { label: 'Happy Customers', value: '10,000+' },
  { label: 'Cities Covered', value: '50+' },
  { label: 'Vehicles in Fleet', value: '200+' },
  { label: 'Years of Experience', value: '8+' },
];

export default function StatsSection() {
  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
