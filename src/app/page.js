// SwiftLift Express Moving - Landing Page
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">

      {/* HERO */}

      <section className="bg-slate-900 text-white text-center py-24 px-6">

        <h1 className="text-5xl font-bold mb-4">
          SwiftLift Express Moving
        </h1>

        <p className="text-xl mb-6">
          Fast, Reliable Movers Across the Dallas–Fort Worth Area
        </p>

        <div className="space-x-4">

          <a
            href="tel:6822884710"
            className="bg-green-500 px-6 py-3 rounded font-semibold"
          >
            📞 (682) 288-4710
          </a>

          <a
            href="#quote"
            className="bg-white text-slate-900 px-6 py-3 rounded font-semibold"
          >
            Get Quote
          </a>

        </div>

      </section>


      {/* PRICING */}

      <section className="py-20 text-center">

        <h2 className="text-3xl font-bold mb-10">
          Simple Hourly Pricing
        </h2>

        <div className="flex justify-center gap-10 flex-wrap">

          <div className="bg-white p-8 rounded shadow w-72">
            <h3 className="text-xl font-bold mb-2">
              2 Movers
            </h3>
            <p className="text-3xl font-bold">
              $195/hr
            </p>
            <p className="mt-3">
              Ideal for apartments and small homes
            </p>
          </div>

          <div className="bg-white p-8 rounded shadow w-72">
            <h3 className="text-xl font-bold mb-2">
              3 Movers
            </h3>
            <p className="text-3xl font-bold">
              $255/hr
            </p>
            <p className="mt-3">
              Perfect for larger moves
            </p>
          </div>

        </div>

        <p className="mt-6">
          2 hour minimum. No hidden fees.
        </p>

      </section>


      {/* ADDONS */}

      <section className="bg-white py-20 text-center">

        <h2 className="text-3xl font-bold mb-8">
          Add-On Services
        </h2>

        <div className="space-y-2">

          <p>Stairs – $75</p>
          <p>Heavy Items (Piano / Safe) – $100</p>
          <p>Same Day Booking – $50</p>
          <p>Furniture Protection Included</p>

        </div>

      </section>


      {/* SERVICE AREA */}

      <section className="py-20 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Service Area
        </h2>

        <p>
          Dallas • Fort Worth • Arlington • Grand Prairie • Irving • Plano • Frisco
        </p>

      </section>


      {/* FREE MOVING TOOLS */}

      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Free Moving Tools
          </h2>

          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Plan your move with our free calculators and planning tools
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Tool 1: Moving Cost Calculator */}
            <a
              href="/tools/moving-cost-calculator"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 text-center hover:scale-105 transform duration-200"
            >
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Moving Cost Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Get an instant estimate for your move across Texas
              </p>
              <div className="mt-4 text-green-600 font-semibold">
                Calculate Now →
              </div>
            </a>

            {/* Tool 2: Truck Size Calculator */}
            <a
              href="/tools/moving-truck-size"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 text-center hover:scale-105 transform duration-200"
            >
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                What Size Truck Do I Need?
              </h3>
              <p className="text-gray-600 text-sm">
                Find the perfect moving truck size for your belongings
              </p>
              <div className="mt-4 text-green-600 font-semibold">
                Find Out →
              </div>
            </a>

            {/* Tool 3: Apartment Estimator */}
            <a
              href="/tools/apartment-estimator"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 text-center hover:scale-105 transform duration-200"
            >
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Apartment Moving Estimator
              </h3>
              <p className="text-gray-600 text-sm">
                Calculate costs for studio, 1BR, 2BR, or 3BR apartments
              </p>
              <div className="mt-4 text-green-600 font-semibold">
                Estimate Now →
              </div>
            </a>

            {/* Tool 4: Timeline Planner */}
            <a
              href="/tools/timeline-planner"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 text-center hover:scale-105 transform duration-200"
            >
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Moving Timeline Planner
              </h3>
              <p className="text-gray-600 text-sm">
                Stay organized with a week-by-week moving checklist
              </p>
              <div className="mt-4 text-green-600 font-semibold">
                Start Planning →
              </div>
            </a>

          </div>

        </div>

      </section>


      {/* MOVERS WANTED */}

      <section className="bg-white py-20 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Movers Wanted
        </h2>

        <p className="mb-8 text-lg">
          Join the SwiftLift crew. Flexible jobs across the Dallas–Fort Worth area. Earn $45–$50 per hour.
        </p>

        <a
          href="/movers"
          className="bg-green-500 text-white px-6 py-3 rounded font-semibold inline-block hover:bg-green-600"
        >
          Apply to Work With Us
        </a>

      </section>


      {/* QUOTE FORM */}

      <section
        id="quote"
        className="bg-gray-200 py-20 px-6"
      >

        <h2 className="text-3xl font-bold text-center mb-10">
          Request a Quote
        </h2>

        <form
          action="https://formspree.io/f/mjgabnek"
          method="POST"
          className="max-w-xl mx-auto space-y-4"
        >

          <input
            name="name"
            className="w-full p-3 rounded border"
            placeholder="Name"
          />

          <input
            name="phone"
            className="w-full p-3 rounded border"
            placeholder="Phone Number"
          />

          <input
            name="move_date"
            className="w-full p-3 rounded border"
            placeholder="Move Date"
          />

          <input
            name="from_address"
            className="w-full p-3 rounded border"
            placeholder="From Address"
          />

          <input
            name="to_address"
            className="w-full p-3 rounded border"
            placeholder="To Address"
          />

          <textarea
            name="move_details"
            className="w-full p-3 rounded border"
            placeholder="Tell us about your move"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded font-bold"
          >
            Submit Request
          </button>

        </form>

      </section>

    </main>
  );
}
