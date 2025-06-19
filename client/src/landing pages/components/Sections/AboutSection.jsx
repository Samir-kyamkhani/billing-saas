import { Info } from "lucide-react";
import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-slate-300 backdrop-blur-sm rounded-full border border-slate-400 mb-6">
            <Info className="w-4 h-4 text-indigo-500 mr-2" />
            <span className="text-sm text-slate-700">About BillMaster</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Empowering Businesses to
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              thrive
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            At BillMaster, we believe billing shouldn't be a burden. That's why
            we've built an intelligent platform that simplifies financial
            operations—helping businesses focus on what they do best. With
            innovation at our core, we’re on a mission to make billing faster,
            smarter, and more human.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white/5 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              To redefine the billing experience through powerful automation,
              intuitive design, and customer-centric tools that drive business
              growth.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed">
              A world where businesses of all sizes have seamless access to
              financial technology that empowers them to succeed with clarity
              and confidence.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-slate-300 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              Our Impact
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Trusted by over 10,000+ businesses globally, BillMaster helps
              companies save time, reduce errors, and improve cash flow—every
              single day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
