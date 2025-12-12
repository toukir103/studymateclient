import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

const PartnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [user, setUser] = useState(null);

  // 🔹 Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast.error("⚠ Please log in to view partner details.");
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 🔹 Fetch partner details
  useEffect(() => {
    const fetchPartner = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://studymate-server-alpha.vercel.app/partners/${id}`);
        setPartner(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load partner details!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  // 🔹 Send Partner Request
  const handleSendRequest = async () => {
    if (!user) {
      toast.error("⚠ You must log in before sending a request!");
      return;
    }

    setRequesting(true);
    try {
      const requestData = {
        senderEmail: user.email,
        receiverEmail: partner.email || "",
        name: partner.name || "",
        studyMode: partner.studyMode || "",
        time: partner.time || "",
        location: partner.location || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(
        `http://studymate-server-alpha.vercel.app/partners/${id}/request`,
        requestData
      );

      toast.success(res.data.message || "Partner request sent successfully!");

      // Update partner count locally
      setPartner((prev) => ({
        ...prev,
        partnerCount: (prev.partnerCount || 0) + 1,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending request!");
      console.error(error);
    } finally {
      setRequesting(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!partner) return <p className="text-center mt-20">Partner not found!</p>;

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex flex-col items-center">
          <img
            src={partner.photo || "https://i.pravatar.cc/150"}
            alt={partner.name}
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold mb-1">{partner.name}</h2>
          <p className="text-gray-600 mb-2">Subject: {partner.subject}</p>
          <p className="text-gray-500 mb-2">Location: {partner.location}</p>
          <p className="text-gray-500 mb-2">Mode: {partner.studyMode}</p>
          <p className="text-gray-500 mb-2">Time: {partner.time}</p>
          <p className="text-gray-500 mb-2">Experience: {partner.experience}</p>
          <p className="text-yellow-500 mb-2">⭐ Rating: {partner.rating}</p>
          <p className="text-blue-600 mb-4">
            Partner Requests: {partner.partnerCount || 0}
          </p>

          <button
            onClick={handleSendRequest}
            disabled={requesting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {requesting ? "Sending..." : "Send Partner Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
