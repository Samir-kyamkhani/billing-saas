import { BarChart3, CreditCard, Globe, Shield, Users, Zap } from "lucide-react";
import React from "react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Smart Invoicing",
      description:
        "Automated invoice generation with customizable templates and smart payment reminders",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Revenue Analytics",
      description:
        "Real-time insights into your billing performance with advanced reporting dashboards",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description:
        "Bank-level security with PCI compliance and encrypted payment processing",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Process thousands of transactions per second with 99.9% uptime guarantee",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Multi-user access with role-based permissions and approval workflows",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description:
        "Multi-currency support with automatic tax calculations for 180+ countries",
    },
  ];
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl  mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-slate-300 backdrop-blur-sm rounded-full border border-slate-400 mb-6">
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-slate-700">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              scale
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From automated invoicing to advanced analytics, BillMaster provides
            all the tools your business needs to streamline billing and
            accelerate growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-slate-600 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="mb-6 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-700  group-hover:text-slate-800 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-700  group-hover:text-slate-800 transition-colors duration-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
