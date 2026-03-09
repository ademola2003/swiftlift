'use client';

import { useState } from 'react';

type PropertyType = 'apartment' | 'house';
type TruckSize = '10ft' | '15ft' | '20ft' | '26ft';

interface TruckRecommendation {
  size: TruckSize;
  title: string;
  description: string;
  capacity: string;
  bestFor: string[];
}

const TRUCK_SIZES: Record<TruckSize, TruckRecommendation> = {
  '10ft': {
    size: '10ft',
    title: '10-Foot Truck',
    description: 'Perfect for small moves and studio apartments',
    capacity: 'Up to 800 cubic feet',
    bestFor: [
      'Studio apartment',
      'Small 1-bedroom',
      'Dorm room',
      'Few furniture pieces',
    ],
  },
  '15ft': {
    size: '15ft',
    title: '15-Foot Truck',
    description: 'Ideal for 1-2 bedroom apartments',
    capacity: 'Up to 764 cubic feet',
    bestFor: [
      '1-2 bedroom apartment',
      'Small house',
      '2-3 rooms of furniture',
      'Small to medium move',
    ],
  },
  '20ft': {
    size: '20ft',
    title: '20-Foot Truck',
    description: 'Great for 2-3 bedroom homes',
    capacity: 'Up to 1,015 cubic feet',
    bestFor: [
      '2-3 bedroom house',
      'Large apartment',
      '3-4 rooms of furniture',
      'Medium to large move',
    ],
  },
  '26ft': {
    size: '26ft',
    title: '26-Foot Truck',
    description: 'Best for large homes and long-distance moves',
    capacity: 'Up to 1,682 cubic feet',
    bestFor: [
      '3-5+ bedroom house',
      'Full house',
      'Large family home',
      'Long-distance move',
    ],
  },
};

export default function TruckCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [squareFootage, setSquareFootage] = useState<number>(500);
  const [largeItems, setLargeItems] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<TruckRecommendation | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    moveDate: '',
    moveFrom: '',
    moveTo: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const largeItemOptions = [
    'Piano',
    'Pool Table',
    'Large Safe',
    'Refrigerator',
    'Washer/Dryer',
    'Large Sofa',
    'King Bed',
    'Dining Set',
  ];

  const toggleLargeItem = (item: string) => {
    setLargeItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const calculateTruckSize = (): TruckSize => {
    let size: TruckSize = '10ft';

    // Base calculation on property type and bedrooms
    if (propertyType === 'apartment') {
      if (bedrooms === 0) size = '10ft';
      else if (bedrooms === 1) size = '15ft';
      else if (bedrooms === 2) size = '20ft';
      else size = '26ft';
    } else {
      // House
      if (bedrooms <= 1) size = '15ft';
      else if (bedrooms === 2) size = '20ft';
      else size = '26ft';
    }

    // Adjust for square footage
    if (squareFootage > 2000) {
      if (size === '15ft') size = '20ft';
      if (size === '20ft') size = '26ft';
    }

    // Adjust for large items
    if (largeItems.length >= 4) {
      if (size === '10ft') size = '15ft';
      else if (size === '15ft') size = '20ft';
      else if (size === '20ft') size = '26ft';
    } else if (largeItems.length >= 2) {
      if (size === '10ft') size = '15ft';
    }

    return size;
  };

  const handleCalculate = () => {
    const truckSize = calculateTruckSize();
    setRecommendation(TRUCK_SIZES[truckSize]);
    setShowResults(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xeerepdо', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyType,
          bedrooms,
          squareFootage,
          largeItems: largeItems.join(', '),
          recommendedTruck: recommendation?.size,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Calculator Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Find Your Perfect Truck Size
        </h2>

        <div className="space-y-6">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPropertyType('apartment')}
                className={`py-3 px-6 rounded-lg font-semibold transition-all ${
                  propertyType === 'apartment'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Apartment
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('house')}
                className={`py-3 px-6 rounded-lg font-semibold transition-all ${
                  propertyType === 'house'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                House
              </button>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Bedrooms: {bedrooms === 5 ? '5+' : bedrooms === 0 ? 'Studio' : bedrooms}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Studio</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5+</span>
            </div>
          </div>

          {/* Square Footage */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Square Footage: {squareFootage.toLocaleString()} sq ft
            </label>
            <input
              type="range"
              min="300"
              max="3000"
              step="100"
              value={squareFootage}
              onChange={(e) => setSquareFootage(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>300</span>
              <span>1,500</span>
              <span>3,000+</span>
            </div>
          </div>

          {/* Large Items */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Large Items (check all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {largeItemOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleLargeItem(item)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    largeItems.includes(item)
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {largeItems.includes(item) && '✓ '}
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg"
          >
            Calculate Truck Size
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && recommendation && (
        <div className="bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-orange-300">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🚚</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Recommended Truck Size
            </h3>
            <div className="text-5xl md:text-6xl font-extrabold text-orange-600 mb-4">
              {recommendation.title}
            </div>
            <p className="text-xl text-gray-700 mb-4">{recommendation.description}</p>
            <p className="text-lg font-semibold text-gray-600">{recommendation.capacity}</p>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-900 mb-3">Best For:</h4>
            <ul className="space-y-2">
              {recommendation.bestFor.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h4 className="text-2xl font-bold text-gray-900 mb-3">
              Want Professionals to Handle the Move?
            </h4>
            <p className="text-gray-600 mb-6">
              Skip the truck rental and let SwiftLift Moving take care of everything!
            </p>

            <a
              href="tel:6822884710"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all mb-4"
            >
              📞 (682) 288-4710
            </a>

            <div className="flex justify-center gap-4">
              <a
                href="tel:6822884710"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow transform hover:scale-105 transition-all"
              >
                Call Now
              </a>
              <button
                type="button"
                onClick={() => {
                  const quoteForm = document.getElementById('quote-form');
                  quoteForm?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow transform hover:scale-105 transition-all"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Form */}
      <div id="quote-form" className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          Get a Free Moving Quote
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Fill out the form below and we'll get back to you with a customized quote
        </p>

        {formSubmitted ? (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h4 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h4>
            <p className="text-gray-700">
              We've received your request and will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="(XXX) XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Moving Date
              </label>
              <input
                type="date"
                value={formData.moveDate}
                onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Move From
              </label>
              <input
                type="text"
                value={formData.moveFrom}
                onChange={(e) => setFormData({ ...formData, moveFrom: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Pickup address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Move To
              </label>
              <input
                type="text"
                value={formData.moveTo}
                onChange={(e) => setFormData({ ...formData, moveTo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Destination address"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg"
            >
              Request Free Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
