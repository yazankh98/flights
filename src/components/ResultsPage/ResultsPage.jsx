import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ResultsPage() {
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from");
    const to = queryParams.get("to");
    const date = queryParams.get("date");

    useEffect(() => {
        console.log(from);

        const fetchFlights = async () => {
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
                        "X-RapidAPI-Key": "ead142ceadmsh86b78d262877664p1343d9jsnf54cdf50f6fa",
                        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                    },
                };

                const response = await axios.request(options);
                setFlights(response.data.flights || []);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };

        fetchFlights();
    }, [from, to, date]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Flight Search Results</h1>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex flex-wrap gap-4 justify-center text-gray-600">
                            <span className="flex items-center">
                                From: {from}
                            </span>
                            <span className="flex items-center">
                                To: {to}
                            </span>
                            <span className="flex items-center">
                                Date: {date}
                            </span>
                        </div>
                    </div>

                    {flights.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {flights.map((flight, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold text-gray-800">{flight.airline}</h3>
                                            <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                                                ${flight.price}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-gray-600">
                                                <p>Departure: {flight.departureTime}</p>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <p>Arrival: {flight.arrivalTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="mt-4 text-lg text-gray-600">No flights found for your search criteria.</p>
                            <p className="text-gray-400">Try adjusting your search parameters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResultsPage;