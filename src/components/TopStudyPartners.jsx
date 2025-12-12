import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import Spinner from "./Spinner";

const TopStudyPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Get auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    axios
      .get("http://studymate-server-alpha.vercel.app/partners")
      .then((res) => {
        const topPartners = res.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setPartners(topPartners);
      })
      .catch((err) => console.error("Error fetching partners:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const handleViewProfile = (id) => {
    if (user) {
      navigate(`/partners/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Top Study Partners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {partners.map((partner) => (
          <div
            key={partner._id}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center text-center w-full max-w-xs"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-500"
            />
            <h3 className="text-2xl font-semibold mb-1 text-gray-800">{partner.name}</h3>
            <p className="text-gray-500 mb-2">{partner.subject}</p>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 mr-1" size={20} />
              <span className="text-yellow-500 font-semibold">{partner.rating}</span>
            </div>
            <button
              onClick={() => handleViewProfile(partner._id)}
              className="mt-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStudyPartners;
