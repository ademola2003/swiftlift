export default function Movers() {
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-lg">

        <h1 className="text-4xl font-bold text-center mb-4 text-black">
          Join the SwiftLift Moving Crew
        </h1>

        <p className="text-center text-black font-bold mb-8">
          Looking for experienced movers in the Dallas–Fort Worth area.
          Earn $45–$50 per hour with flexible scheduling.
        </p>

        <form
          action="https://formspree.io/f/mojkqybn"
          method="POST"
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="experience"
            placeholder="Years of Moving Experience"
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="strength"
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Strength Level</option>
            <option>1 - Light lifting</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5 - Heavy furniture</option>
          </select>

          <select
            name="truck"
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Do you have a truck?</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <textarea
            name="availability"
            placeholder="Availability (days/times you can work)"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-4 rounded-md text-lg font-semibold hover:bg-blue-600 transition"
          >
            Apply to Join the Crew
          </button>

        </form>

      </div>

    </main>
  );
}
