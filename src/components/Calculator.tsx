'use client';

import { useState, useEffect } from 'react';

const TEXAS_CITIES = [
  { name: 'Dallas', lat: 32.7767, lng: -96.7970 },
  { name: 'Fort Worth', lat: 32.7555, lng: -97.3308 },
  { name: 'Arlington', lat: 32.7357, lng: -97.1081 },
  { name: 'Plano', lat: 33.0198, lng: -96.6989 },
  { name: 'Irving', lat: 32.8140, lng: -96.9489 },
  { name: 'Grand Prairie', lat: 32.7459, lng: -96.9978 },
  { name: 'McKinney', lat: 33.1972, lng: -96.6397 },
  { name: 'Frisco', lat: 33.1507, lng: -96.8236 },
];

interface CalculatorProps {}

export default function Calculator({}: CalculatorProps) {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [homeType, setHomeType] = useState('');
  const [rooms, setRooms] = useState(1);
  const [stairs, setStairs] = useState(false);
  const [distance, setDistance] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [costRange, setCostRange] = useState({ low: 0, high: 0 });

  // Calculate distance between two cities
  const calculateDistance = (city1: string, city2: string): number => {
    const c1 = TEXAS_CITIES.find(c => c.name === city1);
    const c2 = TEXAS_CITIES.find(c => c.name === city2);

    if (!c1 || !c2) return 0;

    const R = 3959; // Earth's radius in miles
    const dLat = (c2.lat - c1.lat) * Math.PI / 180;
    const dLon = (c2.lng - c1.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  // Update distance when cities change
  useEffect(() => {
    if (fromCity && toCity) {
      const dist = calculateDistance(fromCity, toCity);
      setDistance(dist);
    }
  }, [fromCity, toCity]);

  const calculateCost = () => {
    const BASE_RATE = 195;

    // Base time: 1 room = 2 hours, +1 hour per additional room
    let estimatedTime = 2 + (rooms - 1);

    // Add time for stairs
    if (stairs) {
      estimatedTime += 1;
    }

    // Add time for distance: +0.5 hours per 30 miles
    estimatedTime += (distance / 30) * 0.5;

    // Calculate cost range
    const lowEstimate = Math.round(estimatedTime * BASE_RATE);
    const highEstimate = Math.round(estimatedTime * 1.3 * BASE_RATE);

    setCostRange({ low: lowEstimate, high: highEstimate });
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCost();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* From City */}
          <div>
            <label htmlFor="fromCity" className="block text-sm font-semibold text-gray-700 mb-2">
              Move From City *
            </label>
            <select
              id="fromCity"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
            >
              <option value="">Select a city</option>
              {TEXAS_CITIES.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* To City */}
          <div>
            <label htmlFor="toCity" className="block text-sm font-semibold text-gray-700 mb-2">
              Move To City *
            </label>
            <select
              id="toCity"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
            >
              <option value="">Select a city</option>
              {TEXAS_CITIES.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Distance Display */}
        {distance > 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 font-semibold">
              Estimated Distance: <span className="text-2xl">{distance}</span> miles
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Home Type */}
          <div>
            <label htmlFor="homeType" className="block text-sm font-semibold text-gray-700 mb-2">
              Home Type *
            </label>
            <select
              id="homeType"
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
            >
              <option value="">Select type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="storage">Storage</option>
            </select>
          </div>

          {/* Number of Rooms */}
          <div>
            <label htmlFor="rooms" className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Rooms *
            </label>
            <select
              id="rooms"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Room' : 'Rooms'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stairs */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={stairs}
              onChange={(e) => setStairs(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900 font-semibold">
              Stairs involved in the move?
            </span>
          </label>
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105 text-lg"
        >
          Calculate Moving Cost
        </button>
      </form>

      {/* Results */}
      {showResults && (
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-2xl p-8 border-2 border-green-300 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Your Estimated Moving Cost
          </h3>
          <div className="text-center">
            <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              ${costRange.low.toLocaleString()} - ${costRange.high.toLocaleString()}
            </p>
            <p className="text-gray-600 mt-4 text-lg">
              Based on {rooms} {rooms === 1 ? 'room' : 'rooms'}, {distance} miles,
              {stairs ? ' with stairs' : ' no stairs'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Rate: $195/hour | 2 movers minimum
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
