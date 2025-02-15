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
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                                From: {from}
                            </span>
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                </svg>
                                To: {to}
                            </span>
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
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
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <p>Departure: {flight.departureTime}</p>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <p>Arrival: {flight.arrivalTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
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