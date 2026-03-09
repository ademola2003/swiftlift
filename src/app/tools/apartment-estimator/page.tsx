import ApartmentEstimator from '@/components/ApartmentEstimator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apartment Moving Cost Estimator | Free Quote | SwiftLift Moving',
  description: 'Estimate your apartment moving costs instantly. Get accurate pricing for studio, 1BR, 2BR, and 3BR apartments. Professional movers in Dallas-Fort Worth area.',
  keywords: [
    'apartment moving cost',
    'how much to move a 1 bedroom apartment',
    'apartment moving estimate',
    'moving cost calculator',
    'Dallas movers',
    'Fort Worth moving company',
    'apartment movers near me',
  ],
};

export default function ApartmentEstimatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Moving Service',
            provider: {
              '@type': 'LocalBusiness',
              name: 'SwiftLift Moving',
              image: '',
              '@id': '',
              url: '',
              telephone: '(682) 288-4710',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                addressLocality: 'Dallas',
                addressRegion: 'TX',
                postalCode: '',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 32.7767,
                longitude: -96.7970,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '07:00',
                closes: '19:00',
              },
              sameAs: [],
            },
            areaServed: {
              '@type': 'City',
              name: 'Dallas-Fort Worth',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Moving Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Studio Apartment Moving',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '1 Bedroom Apartment Moving',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '2 Bedroom Apartment Moving',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '3 Bedroom Apartment Moving',
                  },
                },
              ],
            },
          }),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <a href="/" className="text-teal-600 hover:underline mb-4 inline-block">
            ← Back to SwiftLift Moving
          </a>
          <ApartmentEstimator />
        </div>
      </div>
    </>
  );
}
