import { Quote, Star } from "lucide-react";

const Testimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">What Students Say</h2>
          <p className="text-gray-500 text-lg">No testimonials found yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Students Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center flex flex-col items-center relative"
            >
              {/* Quotation Icon */}
              <Quote className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-blue-400" size={28} />

              {/* Message */}
              <p className="text-gray-700 mb-4 text-lg italic mt-6">"{t.message}"</p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} className="text-yellow-400 mr-1" size={18} />
                ))}
              </div>

              {/* Date Badge */}
              <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">
                {new Date(t.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
