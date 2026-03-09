import Calculator from '@/components/Calculator';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Texas Moving Cost Calculator | SwiftLift Moving',
  description: 'Get an instant estimate for your move across Dallas, Fort Worth, Arlington, and all of Texas. Free moving cost calculator with transparent pricing.',
  keywords: ['moving cost calculator', 'how much do movers cost in Texas', 'moving estimate Arlington TX', 'Dallas movers cost', 'Fort Worth moving companies'],
};

export default function MovingCostCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header with Back Link */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <a href="/" className="text-sm hover:underline mb-2 inline-block">
            ← Back to SwiftLift Moving
          </a>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Texas Moving Cost Calculator
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Get an instant estimate for your move across Dallas, Fort Worth, Arlington, and all of Texas
          </p>
        </div>
      </header>

      {/* Calculator Section */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
              Calculate Your Moving Costs
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Answer a few quick questions to get an accurate estimate for your move
            </p>
          </div>

          <Calculator />

          {/* Info Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Professional movers with years of experience</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-green-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">$195/hour with no hidden fees</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fully Insured</h3>
              <p className="text-gray-600">Your belongings are protected</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Book Your Move?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Call or Text SwiftLift Moving Today!
            </p>

            <a
              href="tel:6822884710"
              className="inline-block bg-white text-blue-600 font-bold text-3xl md:text-4xl py-6 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all mb-8"
            >
              (682) 288-4710
            </a>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="tel:6822884710"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105 text-lg"
              >
                📞 Call Now
              </a>
              <a
                href="sms:6822884710"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105 text-lg"
              >
                💬 Text Us
              </a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-3xl font-bold text-center mb-8">Or Get a Free Quote Online</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-semibold mb-2">SwiftLift Moving</p>
          <p className="text-gray-400">Professional Moving Services Across Texas</p>
          <p className="text-gray-400 mt-4">&copy; 2024 SwiftLift Moving. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
