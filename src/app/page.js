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
            Call Now
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


      {/* QUOTE FORM */}

      <section
        id="quote"
        className="bg-gray-200 py-20 px-6"
      >

        <h2 className="text-3xl font-bold text-center mb-10">
          Request a Quote
        </h2>

        <form className="max-w-xl mx-auto space-y-4">

          <input
            className="w-full p-3 rounded border"
            placeholder="Name"
          />

          <input
            className="w-full p-3 rounded border"
            placeholder="Phone"
          />

          <input
            className="w-full p-3 rounded border"
            placeholder="Move Date"
          />

          <input
            className="w-full p-3 rounded border"
            placeholder="From Address"
          />

          <input
            className="w-full p-3 rounded border"
            placeholder="To Address"
          />

          <textarea
            className="w-full p-3 rounded border"
            placeholder="Describe your move"
          />

          <button
            className="w-full bg-green-500 text-white py-3 rounded font-bold"
          >
            Submit Request
          </button>

        </form>

      </section>

    </main>
  );
}
