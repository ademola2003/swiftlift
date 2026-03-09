'use client';

import { useState } from 'react';

type ApartmentSize = 'studio' | '1br' | '2br' | '3br';
type HeavyItem = 'piano' | 'pool-table' | 'safe' | 'heavy-furniture';

interface EstimateResult {
  minHours: number;
  maxHours: number;
  minCost: number;
  maxCost: number;
  breakdown: {
    baseTime: string;
    stairPenalty: string | null;
    heavyItems: string | null;
    distance: string | null;
  };
}

export default function ApartmentEstimator() {
  const [apartmentSize, setApartmentSize] = useState<ApartmentSize>('studio');
  const [floorLevel, setFloorLevel] = useState<number>(1);
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [distance, setDistance] = useState<number>(10);
  const [heavyItems, setHeavyItems] = useState<Set<HeavyItem>>(new Set());
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const calculateEstimate = (): EstimateResult => {
    const HOURLY_RATE = 195;

    // Base time estimates
    const timeRanges: Record<ApartmentSize, [number, number]> = {
      studio: [2, 3],
      '1br': [3, 4],
      '2br': [4, 6],
      '3br': [6, 8],
    };

    let [minHours, maxHours] = timeRanges[apartmentSize];
    const breakdown: EstimateResult['breakdown'] = {
      baseTime: `${apartmentSize.toUpperCase()}: ${minHours}-${maxHours} hours`,
      stairPenalty: null,
      heavyItems: null,
      distance: null,
    };

    // Stairs penalty (no elevator and floor > 2)
    if (!hasElevator && floorLevel > 2) {
      minHours += 1;
      maxHours += 1;
      breakdown.stairPenalty = `Stairs (Floor ${floorLevel}, no elevator): +1 hour`;
    }

    // Heavy items (+0.5 hours each)
    if (heavyItems.size > 0) {
      const heavyItemHours = heavyItems.size * 0.5;
      minHours += heavyItemHours;
      maxHours += heavyItemHours;
      breakdown.heavyItems = `${heavyItems.size} heavy item(s): +${heavyItemHours} hours`;
    }

    // Distance (+30 min per 20 miles)
    const distanceHours = Math.floor(distance / 20) * 0.5;
    if (distanceHours > 0) {
      minHours += distanceHours;
      maxHours += distanceHours;
      breakdown.distance = `Distance (${distance} miles): +${distanceHours} hours`;
    }

    const minCost = Math.round(minHours * HOURLY_RATE);
    const maxCost = Math.round(maxHours * HOURLY_RATE);

    return { minHours, maxHours, minCost, maxCost, breakdown };
  };

  const toggleHeavyItem = (item: HeavyItem) => {
    const newItems = new Set(heavyItems);
    if (newItems.has(item)) {
      newItems.delete(item);
    } else {
      newItems.add(item);
    }
    setHeavyItems(newItems);
  };

  const estimate = calculateEstimate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apartment Moving Cost Estimator
          </h1>
          <p className="text-xl text-gray-600">
            Get an instant estimate for your apartment move
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Apartment Size */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Apartment Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'studio', label: 'Studio' },
                  { value: '1br', label: '1 Bedroom' },
                  { value: '2br', label: '2 Bedroom' },
                  { value: '3br', label: '3 Bedroom' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setApartmentSize(option.value as ApartmentSize)}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      apartmentSize === option.value
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Level */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Floor Level: <span className="text-teal-600">{floorLevel}{floorLevel >= 10 ? '+' : ''}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={floorLevel}
                onChange={(e) => setFloorLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1st Floor</span>
                <span>10+ Floor</span>
              </div>
            </div>

            {/* Elevator */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Elevator Available?
              </label>
              <div className="flex gap-3">
                {[
                  { value: true, label: 'Yes' },
                  { value: false, label: 'No' },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setHasElevator(option.value)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      hasElevator === option.value
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Distance: <span className="text-teal-600">{distance} miles</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 mile</span>
                <span>100+ miles</span>
              </div>
            </div>

            {/* Heavy Items */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Heavy Items
              </label>
              <div className="space-y-2">
                {[
                  { value: 'piano', label: 'Piano' },
                  { value: 'pool-table', label: 'Pool Table' },
                  { value: 'safe', label: 'Large Safe' },
                  { value: 'heavy-furniture', label: 'Heavy Furniture' },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-teal-300 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={heavyItems.has(item.value as HeavyItem)}
                      onChange={() => toggleHeavyItem(item.value as HeavyItem)}
                      className="w-5 h-5 text-teal-500 rounded focus:ring-teal-500 accent-teal-500"
                    />
                    <span className="ml-3 font-medium text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Estimate Card */}
            <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Your Estimate</h2>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Estimated Time</p>
                  <p className="text-3xl font-bold">
                    {estimate.minHours.toFixed(1)} - {estimate.maxHours.toFixed(1)} hours
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">Estimated Cost</p>
                  <p className="text-3xl font-bold">
                    ${estimate.minCost.toLocaleString()} - ${estimate.maxCost.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Cost Breakdown</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Base rate: $195/hour (2 movers)</li>
                    <li>• {estimate.breakdown.baseTime}</li>
                    {estimate.breakdown.stairPenalty && (
                      <li>• {estimate.breakdown.stairPenalty}</li>
                    )}
                    {estimate.breakdown.heavyItems && (
                      <li>• {estimate.breakdown.heavyItems}</li>
                    )}
                    {estimate.breakdown.distance && (
                      <li>• {estimate.breakdown.distance}</li>
                    )}
                  </ul>
                </div>
              </div>

              <p className="text-xs mt-4 opacity-75">
                *Estimate based on average conditions. Final cost may vary.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal-600">500+</div>
                  <div className="text-xs text-gray-600">Moves Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600">4.9★</div>
                  <div className="text-xs text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600">100%</div>
                  <div className="text-xs text-gray-600">Insured</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skip the Stress. Let SwiftLift Moving Handle It.
            </h2>
            <p className="text-xl text-gray-600">
              Professional movers. Transparent pricing. Stress-free moving.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="tel:682XXX4710"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Call Now: (682) XXX-4710
            </a>
            <button
              onClick={() => setShowQuoteForm(!showQuoteForm)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Request Free Quote
            </button>
          </div>

          {/* Quote Form */}
          {showQuoteForm && (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Quote</h3>
              <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Move Date *
                  </label>
                  <input
                    type="date"
                    name="move-date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Address *
                  </label>
                  <input
                    type="text"
                    name="pickup-address"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dropoff Address *
                  </label>
                  <input
                    type="text"
                    name="dropoff-address"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    name="special-instructions"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="hidden"
                  name="estimate"
                  value={`${estimate.minHours.toFixed(1)}-${estimate.maxHours.toFixed(1)} hours, $${estimate.minCost}-$${estimate.maxCost}`}
                />

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Submit Quote Request
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
