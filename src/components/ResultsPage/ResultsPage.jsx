import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";

function ResultsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");

  useEffect(() => {
    const mockFlights = [
      {
        airline: "Emirates",
        price: 420,
        departureTime: "08:30",
        arrivalTime: "14:10",
      },
      {
        airline: "Qatar Airways",
        price: 390,
        departureTime: "11:45",
        arrivalTime: "17:25",
      },
      {
        airline: "Etihad Airways",
        price: 445,
        departureTime: "19:20",
        arrivalTime: "01:05",
      },
    ];

    setLoading(true);

    setTimeout(() => {
      setFlights(mockFlights);
      setLoading(false);
    }, 700);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          <FaArrowLeft />
          Back to search
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Flight Results
          </h1>
          <p className="text-slate-500">
            Available flight options for your selected trip.
          </p>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <FaPlaneDeparture className="text-sky-600" />
              <div>
                <p className="text-sm text-slate-500">From</p>
                <p className="font-semibold text-slate-900">{from || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <FaPlaneArrival className="text-indigo-600" />
              <div>
                <p className="text-sm text-slate-500">To</p>
                <p className="font-semibold text-slate-900">{to || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <FaCalendarAlt className="text-rose-500" />
              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-semibold text-slate-900">{date || "N/A"}</p>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-600 font-medium">Loading flights...</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flights.map((flight, index) => (
              <article
                key={index}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {flight.airline}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Flight option #{index + 1}
                    </p>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ${flight.price}
                  </span>
                </div>

                <div className="space-y-3 text-slate-600">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-slate-400" />
                    <p>Departure: {flight.departureTime}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-slate-400" />
                    <p>Arrival: {flight.arrivalTime}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ResultsPage;