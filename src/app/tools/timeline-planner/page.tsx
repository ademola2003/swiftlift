import TimelinePlanner from '@/components/TimelinePlanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moving Timeline Planner | Free Moving Checklist | SwiftLift Moving',
  description: 'Plan your move week-by-week with our free moving timeline planner. Get a personalized moving checklist and expert help from SwiftLift Moving in Texas.',
  keywords: ['moving checklist', 'moving timeline planner', 'how to plan a move', 'moving schedule', 'moving planner', 'relocation checklist', 'moving tips'],
};

export default function TimelinePlannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Moving Timeline Planner',
    description: 'A free interactive moving timeline planner and checklist to help you organize your move.',
    url: 'https://yourdomain.com',
    applicationCategory: 'LifestyleApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'SwiftLift Moving',
      telephone: '(682) 288-4710',
      areaServed: {
        '@type': 'State',
        name: 'Texas'
      },
      '@id': 'https://yourdomain.com',
      priceRange: '$$'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm print:shadow-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <a href="/" className="text-purple-600 hover:underline mb-4 inline-block">
              ← Back to SwiftLift Moving
            </a>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Moving Timeline Planner
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Stay organized and stress-free with your personalized moving checklist.
                Track your progress and never miss an important task.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TimelinePlanner />
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-20 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  SwiftLift Moving
                </h3>
                <p className="text-gray-400">
                  Professional moving services across Texas. We make your move smooth and stress-free.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Phone: (682) 288-4710</p>
                  <p>Email: info@swiftliftmoving.com</p>
                  <p>Serving all of Texas</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
                  </li>
                  <li>
                    <a href="/#quote" className="hover:text-purple-400 transition-colors">Get a Quote</a>
                  </li>
                  <li>
                    <a href="/movers" className="hover:text-purple-400 transition-colors">Work With Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} SwiftLift Moving. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
