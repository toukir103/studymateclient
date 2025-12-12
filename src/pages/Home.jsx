import axios from "axios";
import { useEffect, useState } from "react";
import HeroCarousel from "../components/Carousel/HeroCarousel";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import TopStudyPartners from "../components/TopStudyPartners";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { dark } = useTheme(); 
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("http://studymate-server-alpha.vercel.app/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <div className={dark ? "bg-gray-900 text-gray-100 min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      
      {/* Hero Section */}
      <section className={dark ? "bg-gray-900" : "bg-white"}>
        <HeroCarousel />
      </section>

      {/* Top Study Partners Section */}
      <section className={`py-12 ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
        <TopStudyPartners />
      </section>

      {/* How It Works Section */}
      <section className={`py-12 ${dark ? "bg-gray-900" : "bg-white"}`}>
        <HowItWorks />
      </section>

      {/* Testimonials Section */}
      <section className={`py-12 ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
        <Testimonials testimonials={testimonials} />
      </section>
      
    </div>
  );
};

export default Home;
