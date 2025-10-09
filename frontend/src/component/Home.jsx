import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import banner from "/rrrr.jpg"; 
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Navbar from "./navbar";
import RegisterBox from "./RegisterBox";
import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import member4 from "../assets/member4.jpg";
import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";
import event4 from "../assets/event4.jpg";

const committeeMembers = [
  { name: "Rajesh Sharma", role: "President", img: member1 },
  { name: "Anita Gupta", role: "Vice President", img: member2 },
  { name: "Vikas Singh", role: "Secretary", img: member3 },
  { name: "Renu Verma", role: "Treasurer", img: member4 },
];

const eventImages = [event1, event2, event3, event4];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 2, spacing: 8 },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 4, spacing: 10 },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        let delay = 2500;
        function nextSlide() {
          timeout = setTimeout(() => slider.next(), delay);
        }
        slider.on("created", nextSlide);
        slider.on("dragStarted", () => clearTimeout(timeout));
        slider.on("animationEnded", nextSlide);
        slider.on("updated", nextSlide);
      },
    ]
  );

  useEffect(() => {
    if (location.state?.scrollToContact) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <>
      <Navbar />

      {/* HERO + REGISTRATION SECTION */}
      <section className="relative h-[100vh] flex items-center justify-center bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500">
        <img src={banner} alt="banner" className="absolute inset-0 w-full h-full object-cover opacity-40" /> 
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white space-y-4 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl leading-tight">
              Transform Your Society<br /> with <span className="text-yellow-300">Smart Complaints</span>
            </h2>
            <p className="text-lg md:text-xl max-w-lg mx-auto md:mx-0 text-gray-200">
              Raise complaints, track progress, and engage with your society – all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto border border-gray-100"
          >
            <RegisterBox />
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Portal Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Complaint Tracking", desc: "Track complaint status in real-time.", icon: "📢" },
            { title: "Maintenance Updates", desc: "Get instant alerts on resolved issues.", icon: "🔧" },
            { title: "Bill & Dues", desc: "View and manage your society maintenance bills online.", icon: "💳" },
            { title: "Events & Notices", desc: "Stay updated about society events and meetings.", icon: "📅" },
            { title: "Transparency", desc: "Access meeting minutes and decisions easily.", icon: "📊" },
            { title: "Community Forum", desc: "Discuss ideas and share suggestions with neighbors.", icon: "💬" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT SOCIETY SECTION */}
      <section className="py-16 px-6 md:px-12 bg-black-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Society</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Shiv Vihar Vikas Samiti is a vibrant residential community known for its unity and active participation. 
            We celebrate cultural festivals like Diwali, Holi, and Independence Day with great enthusiasm, organize 
            monthly meetings to discuss developments, and focus on improving safety, cleanliness, and facilities 
            for all residents.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-5xl mx-auto ">
          {eventImages.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`event-${i}`}
              className="rounded-xl shadow-lg hover:scale-[1.03] transition-transform object-cover h-48 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
          >
            Explore More Events
          </button>
        </div>
      </section>

      {/* COMPLAINT PREVIEW SECTION */}
      <section className="py-12 px-6 md:px-12 bg-orange-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Complaints</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Complaint #{item}</h4>
              <p className="text-gray-600 text-sm">Sample complaint description... (fetch dynamically later)</p>
              <span className="inline-block mt-3 text-xs text-white bg-orange-500 px-3 py-1 rounded-full">
                Pending
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* COMMITTEE MEMBERS */}
      <section className="py-12 px-6 md:px-12 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Meet Our Committe Members</h2>
        <div ref={sliderRef} className="keen-slider">
          {committeeMembers.map((member, index) => (
            <div key={index} className="keen-slider__slide flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-lg w-56 text-center border border-gray-200">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-3 border-4 border-yellow-400 shadow-md"
                />
                <h4 className="font-semibold text-lg text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-6 md:px-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
        <div className="max-w-4xl mx-auto space-y-4 text-center text-gray-700">
          <p>📍 Shiv Vihar Colony, Sector-5, New Delhi</p>
          <p>📧 support@shivvihar.com</p>
          <p>📱 +91 9876543210</p>
          <p>🕒 Office Hours: 9 AM - 6 PM</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold text-white mb-3">🏠 Shiv Vihar Samiti</h4>
            <p className="text-sm leading-relaxed">
              Shiv Vihar Vikas Samiti is a residential community focused on better facilities, transparency, and active participation of all residents.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3">🔗 Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-orange-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-orange-400 transition">About Us</a></li>
              <li><a href="/events" className="hover:text-orange-400 transition">Events</a></li>
              <li><a href="/contact" className="hover:text-orange-400 transition">Contact</a></li>
              <li><a href="/citizenlogin" className="hover:text-orange-400 transition">Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3">📞 Contact</h4>
            <p className="text-sm">📍 Shiv Vihar Colony, Sector-5, New Delhi</p>
            <p className="text-sm">📧 support@shivvihar.com</p>
            <p className="text-sm">📱 +91 9876543210</p>
            <p className="text-sm mt-2">🕒 Office Hours: 9 AM - 6 PM</p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3">🌐 Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-400 transition">🌐 Facebook</a>
              <a href="#" className="hover:text-orange-400 transition">🐦 Twitter</a>
              <a href="#" className="hover:text-orange-400 transition">📸 Instagram</a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-center text-xs py-3 border-t border-gray-700">
          © {new Date().getFullYear()} <span className="text-orange-400 font-semibold">Shiv Vihar Vikas Samiti</span>. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
