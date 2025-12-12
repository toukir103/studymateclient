import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";

const MyConnections = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    studyMode: "",
    time: "",
    location: "",
  });

  //  Fetch requests
  useEffect(() => {
    if (!currentUser?.email) return;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://studymate-server-alpha.vercel.app/my-connections/${currentUser.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your connections");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser?.email]);

  if (loading) return <Spinner />;

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 text-gray-400 font-medium italic">
        No requests sent yet.
      </p>
    );

  //  Handle edit button
  const handleEdit = (req) => {
    setEditing(req._id);
    setFormData({
      name: req.name || "",
      studyMode: req.studyMode || "",
      time: req.time || "",
      location: req.location || "",
    });
  };

  //  Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //  Submit update
  const handleUpdate = async (id) => {
    try {
      const updatedData = {
        ...formData,
        senderEmail: currentUser.email,
        status: "pending",
      };

      const res = await axios.put(
        `http://studymate-server-alpha.vercel.app/connections/${id}`,
        updatedData
      );

      toast.success("Connection updated successfully!");
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? res.data : r))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update connection");
    }
  };

  //  Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this connection?")) return;
    try {
      await axios.delete(`http://studymate-server-alpha.vercel.app/connections/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Connection deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete connection");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-600">
        📋 My Connections
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-600 text-white text-lg">
              <th className="border px-4 py-3">Name</th>
              <th className="border px-4 py-3">Study Mode</th>
              <th className="border px-4 py-3">Time</th>
              <th className="border px-4 py-3">Location</th>
              <th className="border px-4 py-3">Status</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="text-center hover:bg-indigo-50 transition-colors duration-300"
              >
                {editing === req._id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="studyMode"
                        value={formData.studyMode}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2 text-gray-600">{req.status}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleUpdate(req._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2 font-medium text-gray-700">{req.name}</td>
                    <td className="border px-4 py-2 text-gray-600">{req.studyMode}</td>
                    <td className="border px-4 py-2 text-gray-600">{req.time}</td>
                    <td className="border px-4 py-2 text-gray-600">{req.location}</td>
                    <td className="border px-4 py-2 text-gray-600">{req.status}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(req)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyConnections;
