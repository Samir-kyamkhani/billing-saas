import { Star } from "lucide-react";
import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CFO at TechFlow",
      content:
        "BillMaster transformed our billing process. We've reduced payment delays by 60% and saved 20 hours per week.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder at StartupX",
      content:
        "The automation features are incredible. Our cash flow improved dramatically within the first month.",
      rating: 5,
      avatar: "MR",
    },
    {
      name: "Emily Watson",
      role: "Operations Director",
      content:
        "Best billing solution we've ever used. The analytics help us make better business decisions daily.",
      rating: 5,
      avatar: "EW",
    },
  ];
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Loved by
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              thousands
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See what our customers are saying about their experience with
            BillMaster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
