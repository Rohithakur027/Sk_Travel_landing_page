import React from 'react';
import { Vehicle } from '@/types/fleet.types';

// Placeholder fleet data — replace with API data via useFetch
const FLEET: Vehicle[] = [
  {
    id: '1',
    name: 'Sedan',
    category: 'sedan',
    imageUrl: '/images/sedan.jpg',
    capacity: 4,
    pricePerKm: 12,
    features: ['AC', 'Music System', 'GPS'],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: '2',
    name: 'SUV',
    category: 'suv',
    imageUrl: '/images/suv.jpg',
    capacity: 7,
    pricePerKm: 18,
    features: ['AC', 'Spacious Boot', 'GPS', 'Charging Port'],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 215,
  },
  {
    id: '3',
    name: 'Luxury',
    category: 'luxury',
    imageUrl: '/images/luxury.jpg',
    capacity: 4,
    pricePerKm: 30,
    features: ['Premium AC', 'Wi-Fi', 'Refreshments', 'GPS'],
    isAvailable: true,
    rating: 5.0,
    reviewCount: 98,
  },
];

export default function FleetSection() {
  return (
    <section id="fleet" className="fleet-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Fleet</h2>
          <p>Choose from our range of well-maintained, comfortable vehicles.</p>
        </div>
        <div className="fleet-grid">
          {FLEET.map((vehicle) => (
            <div key={vehicle.id} className="fleet-card">
              <div className="fleet-card-image">
                <img src={vehicle.imageUrl} alt={vehicle.name} />
              </div>
              <div className="fleet-card-body">
                <h3>{vehicle.name}</h3>
                <p>Up to {vehicle.capacity} passengers</p>
                <p>₹{vehicle.pricePerKm}/km</p>
                <ul>
                  {vehicle.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href="#booking" className="btn btn-primary">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
