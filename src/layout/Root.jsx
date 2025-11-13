import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from '../components/Navbar/Navbar';
import { useTheme } from "../contexts/ThemeContext";

const Root = () => {
    const { dark } = useTheme();

    return (
        <div className={dark ? "dark min-h-screen bg-gray-900 text-gray-200" : "min-h-screen bg-white text-gray-700"}>
            <Navbar />
            
            <div className="pt-20">
                {/* Toaster */}
                <Toaster position="top-right" reverseOrder={false} />

                {/* Nested routes */}
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default Root;
