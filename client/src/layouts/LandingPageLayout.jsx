import { Outlet } from "react-router-dom";
import Navbar from "../landing pages/components/Header/Navbar";
import Footer from "../landing pages/components/Footer/Footer";

function LandingPageLayout() {
  return (
    <div className="bg-white min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
