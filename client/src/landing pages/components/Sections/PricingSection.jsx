import { Check } from "lucide-react";
import React from "react";

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small businesses",
      features: [
        "Up to 100 invoices/month",
        "Basic analytics",
        "Email support",
        "2 team members",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "79",
      description: "For growing companies",
      features: [
        "Unlimited invoices",
        "Advanced analytics",
        "Priority support",
        "10 team members",
        "Custom branding",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "White-label solution",
        "24/7 phone support",
        "Unlimited team members",
        "Custom integrations",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple,
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a
            14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 hover:scale-105 transition-all duration-300 ${
                plan.popular
                  ? "border-purple-500 shadow-xl shadow-purple-500/20"
                  : "border-slate-600 hover:border-purple-500/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-slate-800">
                  {plan.name}
                </h3>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-800">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                    : "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
