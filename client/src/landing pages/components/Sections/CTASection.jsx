import { ChevronRight } from "lucide-react";
import React from "react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
          Ready to transform your
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            billing?
          </span>
        </h2>
        <p className="text-xl text-slate-700 mb-12">
          Join thousands of businesses already using BillMaster to streamline
          their billing process. Start your free trial today - no credit card
          required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-semibold text-lg text-white hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center">
            Start Your Free Trial
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
