import TruckCalculator from '@/components/TruckCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moving Truck Size Calculator | What Size Truck Do I Need? | SwiftLift Moving',
  description: 'Find the perfect moving truck size for your move. Free calculator helps you choose between 10ft, 15ft, 20ft, or 26ft trucks. Get expert moving help from SwiftLift.',
  keywords: ['what size moving truck do I need', 'moving truck calculator', 'moving truck size guide', 'truck rental size', 'moving truck estimator'],
};

export default function TruckSizeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Moving Truck Size Calculator',
    description: 'Calculate the ideal moving truck size based on your home size and belongings.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'SwiftLift Moving',
      telephone: '(682) 288-4710',
      areaServed: 'United States',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <a href="/" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to SwiftLift Moving
            </a>

            <header className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Moving Truck Size Calculator
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Find the perfect truck size for your move in seconds
              </p>
            </header>

            <TruckCalculator />

            <footer className="mt-12 text-center text-gray-600 text-sm">
              <p>&copy; 2025 SwiftLift Moving. All rights reserved.</p>
              <p className="mt-2">Serving customers nationwide with professional moving services.</p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
