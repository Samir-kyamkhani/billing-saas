import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-slate-300 backdrop-blur-sm rounded-full border border-slate-400 mb-6">
          <Mail className="w-4 h-4 text-purple-500 mr-2" />
          <span className="text-sm text-slate-700">Get in Touch</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
          We'd love to
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            hear from you
          </span>
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Whether you have a question about features, pricing, or anything
          else—our team is ready to help you.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <label
              htmlFor="name"
              className="block text-slate-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-slate-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="jane@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-slate-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white/80 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Your message..."
            ></textarea>
          </div>
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
