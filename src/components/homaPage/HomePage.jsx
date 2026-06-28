import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError("");

      try {
        const options = {
          method: "GET",
          url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights",
          params: {
            from,
            to,
            date,
          },
          headers: {
            "X-RapidAPI-Key": "PUT_YOUR_RAPIDAPI_KEY_HERE",
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setFlights(response.data.flights || []);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Something went wrong while loading flights.");
      } finally {
        setLoading(false);
      }
    };

    if (from && to && date) {
      fetchFlights();
    } else {
      setLoading(false);
      setError("Missing search details. Please try again.");
    }
  }, [from, to, date]);

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

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 text-center mb-3">
            Flight Results
          </h1>
          <p className="text-center text-slate-500">
            Available flights based on your selected route.
          </p>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <FaPlaneDeparture className="text-sky-600" />
              <div>
                <p className="text-sm text-slate-500">From</p>
                <p className="font-semibold text-slate-900">{from}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <FaPlaneArrival className="text-indigo-600" />
              <div>
                <p className="text-sm text-slate-500">To</p>
                <p className="font-semibold text-slate-900">{to}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <FaCalendarAlt className="text-rose-500" />
              <div>
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-semibold text-slate-900">{date}</p>
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-600 font-medium">Loading flights...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-2xl p-10 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && flights.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flights.map((flight, index) => (
              <article
                key={index}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {flight.airline || "Airline"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Flight option #{index + 1}
                    </p>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ${flight.price || "N/A"}
                  </span>
                </div>

                <div className="space-y-3 text-slate-600">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-slate-400" />
                    <p>Departure: {flight.departureTime || "N/A"}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-slate-400" />
                    <p>Arrival: {flight.arrivalTime || "N/A"}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && flights.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No flights found
            </h2>
            <p className="text-slate-500">
              Try changing the airport codes or choosing another date.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ResultsPage;