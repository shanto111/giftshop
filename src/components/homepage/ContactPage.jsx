"use client";

import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function ContactPage() {
  const infos = [
    {
      icon: <FiMapPin className="text-primary text-2xl" />,
      title: "Address",
      text: (
        <>
          123 Gift Street, Shopping District <br />
          City, State 12345
        </>
      ),
    },
    {
      icon: <FiPhone className="text-primary text-2xl" />,
      title: "Phone",
      text: "+880 017 123 4567",
    },
    {
      icon: <FiMail className="text-primary text-2xl" />,
      title: "Email",
      text: "mdhasibulhasan@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-white flex items-center px-4 py-10">
      <div className="w-full max-w-[1850px] mx-auto bg-base-100 p-6 md:p-12 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-3">Get in Touch</h1>
        <p className="text-center text-xl text-base-content/70 mb-12 max-w-2xl mx-auto">
          Have questions? We're here to help you find the perfect gift.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form className="space-y-6">
            {["Name", "Email"].map((label, i) => (
              <div key={i}>
                <label className="label font-medium">{label}</label>
                <input
                  type={label === "Email" ? "email" : "text"}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            ))}

            <div>
              <label className="label font-medium">Message</label>
              <textarea
                placeholder="Write your message"
                className="textarea textarea-bordered w-full h-36 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              ></textarea>
            </div>

            <button className="btn btn-primary w-full text-lg rounded-lg hover:scale-[1.02] transition-transform">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            {infos.map((info, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary/20 transition-colors">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{info.title}</h3>
                  <p className="text-base-content/70">{info.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
