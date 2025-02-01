import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaSearch } from "react-icons/fa";

function HomePage() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (from && to && date) {
            navigate(`/results?from=${from}&to=${to}&date=${date}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 flex flex-col items-center justify-center p-6">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md transform hover:scale-[1.02] transition-all duration-300">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
                    Fly with Us
                </h1>
                <p className="text-gray-600 text-center mb-8">Discover your next adventure</p>
                
                <div className="space-y-6">
                    <div className="relative group">
                        <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="From (e.g. DXB)"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all placeholder-gray-400 hover:border-gray-300"
                        />
                    </div>
                    
                    <div className="relative group">
                        <FaPlaneArrival className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 group-hover:text-purple-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="To (e.g. JFK)"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all placeholder-gray-400 hover:border-gray-300"
                        />
                    </div>
                    
                    <div className="relative group">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 group-hover:text-pink-600 transition-colors" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all hover:border-gray-300"
                        />
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    >
                        <FaSearch className="group-hover:scale-110 transition-transform" />
                        <span>Search Flights</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        ✨ Special offers available for selected destinations
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
