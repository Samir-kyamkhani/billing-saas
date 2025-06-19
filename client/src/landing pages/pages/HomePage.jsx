import { useState, useEffect } from "react";
import { Star, ArrowRight, Play } from "lucide-react";
import ContactSection from "../components/Sections/ContactSection";
import FeaturesSection from "../components/Sections/FeaturesSection";
import TestimonialsSection from "../components/Sections/TestimonialsSection";
import PricingSection from "../components/Sections/PricingSection";
import CTASection from "../components/Sections/CTASection";
import AboutSection from "../components/Sections/AboutSection";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Tagline */}
            <div className="inline-flex items-center px-4 py-2 bg-slate-300 backdrop-blur-sm rounded-full border border-slate-400 mb-8">
              <Star className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm text-slate-700">
                Trusted by 10,000+ businesses worldwide
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Billing Made
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                Beautiful
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your billing process with our AI-powered platform.
              Automate invoices, track payments, and grow your revenue with the
              most intuitive billing solution ever built.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/signup"
                className="px-6 flex items-center py-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 transform hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button className="group px-8 py-4 bg-white/20 text-black backdrop-blur-sm border border-slate-400 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 to-emerald-300/20 rounded-2xl blur-3xl"></div>

              {/* Foreground Card */}
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-300 p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-slate-100 to-slate-300 rounded-xl p-6 border border-slate-400">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Revenue Dashboard
                    </h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white shadow-inner p-4 rounded-lg border border-slate-200">
                      <p className="text-slate-600 text-sm">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        $127,540
                      </p>
                    </div>
                    <div className="bg-white shadow-inner p-4 rounded-lg border border-slate-200">
                      <p className="text-slate-600 text-sm">Pending Invoices</p>
                      <p className="text-2xl font-bold text-amber-500">23</p>
                    </div>
                    <div className="bg-white shadow-inner p-4 rounded-lg border border-slate-200">
                      <p className="text-slate-600 text-sm">Collection Rate</p>
                      <p className="text-2xl font-bold text-violet-600">
                        94.2%
                      </p>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="h-32 bg-gradient-to-r from-indigo-100 to-emerald-100 rounded-lg flex items-end justify-between p-4">
                    <div
                      className="w-8 bg-indigo-500 rounded-t"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="w-8 bg-emerald-500 rounded-t"
                      style={{ height: "80%" }}
                    ></div>
                    <div
                      className="w-8 bg-violet-500 rounded-t"
                      style={{ height: "70%" }}
                    ></div>
                    <div
                      className="w-8 bg-indigo-400 rounded-t"
                      style={{ height: "90%" }}
                    ></div>
                    <div
                      className="w-8 bg-emerald-400 rounded-t"
                      style={{ height: "75%" }}
                    ></div>
                    <div
                      className="w-8 bg-violet-400 rounded-t"
                      style={{ height: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection />

      {/* About Section */}
      <AboutSection />

      {/* ContactSection */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
