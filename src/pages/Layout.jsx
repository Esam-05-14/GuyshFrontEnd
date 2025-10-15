import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Child routes (pages) render here */}
      </main>

      {/* Footer - paste yours here */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
