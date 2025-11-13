// src/pages/FindPartners.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  //  Debounce for search input
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  //  Fetch partners from backend
  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/partners", {
        params: { search: debouncedSearch, sort },
      });
      setPartners(res.data);
    } catch (error) {
      toast.error("Failed to fetch partners");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [debouncedSearch, sort]);

  return (
    <div className="container mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🔍 Find Study Partners
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by name, subject, or location..."
          className="border rounded-lg p-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center w-full col-span-full">Loading...</p>
        ) : partners.length === 0 ? (
          <p className="text-center w-full col-span-full">No partners found.</p>
        ) : (
          partners.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition"
            >
              <img
                src={p.photo || "https://i.pravatar.cc/100"}
                alt={p.name}
                className="w-28 h-28 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{p.name}</h3>
              <p className="text-gray-600 mb-1">{p.subject}</p>
              <p className="text-gray-500 mb-2">{p.location}</p>
              <p className="text-yellow-500 font-medium mb-3">⭐ {p.rating}</p>
              <Link
                to={`/partners/${p._id}`}
                className="w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Profile
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindPartners;
