import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper to get events from localStorage or default
const getInitialEvents = () => {
  const stored = localStorage.getItem("events");
  if (stored) return JSON.parse(stored);
  return [
    {
      id: 1,
      title: "Navratra Special Garba Night",
      description: "Join us for a fun-filled Garba night with music, dance & snacks!",
      price: 500,
      date: "2025-10-10",
      img: "/happy-navratri-wishes.webp"
    }
  ];
};

function Events() {
  const [events, setEvents] = useState(getInitialEvents());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  // Sync events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // On mount, load events from localStorage (in case another tab added)
  useEffect(() => {
    setEvents(getInitialEvents());
  }, []);

  const createEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "New Exciting Event",
      description: "This is a newly created event. Join us for fun & celebration!",
      price: 300,
      date: "2025-10-15",
      img: "https://images.unsplash.com/photo-1582719478176-2f8323f598a2?auto=format&fit=crop&w=800&q=80"
    };
    setEvents([...events, newEvent]);
  };

  const openDialog = (event) => {
    setSelectedEvent(event);
  };

  const closeDialog = () => {
    setSelectedEvent(null);
  };

  // Load Razorpay script on mount
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      // Optionally, you can handle script.onload if you want to know when it's loaded
    }
  }, []);

  // Razorpay payment handler
  const handlePayment = (event) => {
    if (!window.Razorpay) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }
    const options = {
      key: "rzp_test_RKzrr5TI7Ls1sL", // Replace with your Razorpay key
      amount: event.price * 100,
      currency: "INR",
      name: event.title,
      description: event.description,
      image: "https://www.wishbygift.com/wp-content/uploads/2024/09/happy-navratri-wishes.webp",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        closeDialog();
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#f59e42",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 min-h-screen">
      {/* Banner Start */}
      <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-300">
        <img
          src="https://www.wishbygift.com/wp-content/uploads/2024/09/happy-navratri-wishes.webp"
          alt="Navratri Dandiya Night"
          className="w-full h-64 object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-pink-600/60 to-yellow-400/50 flex items-center">
          <div className="flex items-center px-10 py-6 w-full">
            {/* Dandiya SVG Icon */}
            <span className="flex items-center justify-center bg-white/30 rounded-full shadow-lg mr-8 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-yellow-300 drop-shadow-xl"
                viewBox="0 0 64 64"
                fill="none"
              >
                <rect x="10" y="44" width="6" height="20" rx="3" transform="rotate(-45 10 44)" fill="#fbbf24" />
                <rect x="48" y="10" width="6" height="20" rx="3" transform="rotate(45 48 10)" fill="#f59e42" />
                <circle cx="32" cy="32" r="8" fill="#fff7ae" stroke="#fbbf24" strokeWidth="2"/>
                <path d="M24 40 Q32 48 40 40" stroke="#f59e42" strokeWidth="2" fill="none"/>
                <circle cx="32" cy="32" r="3" fill="#fbbf24"/>
              </svg>
            </span>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg tracking-wide glow">
                Navratri Dandiya Night
              </h2>
              <p className="text-xl sm:text-2xl text-yellow-100 mt-3 font-semibold drop-shadow">
                Dance • Music • Fun • Food &amp; More!
              </p>
              <p className="text-base text-yellow-200 mt-2 font-medium">
                <span className="inline-block animate-pulse text-yellow-300">🪔</span>
                &nbsp;10th October 2025 | 7:00 PM Onwards
              </p>
            </div>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <svg className="absolute bottom-0 left-0 w-full" height="40" viewBox="0 0 1440 320">
          <path fill="#fffbe9" fillOpacity="1" d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      {/* Banner End */}

      <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center tracking-wide">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer border-2 border-orange-200 hover:border-orange-400"
          >
            <img
              src={event.img}
              alt={event.title}
              className="h-48 w-full object-cover cursor-pointer"
              onClick={() => openDialog(event)}
            />
            <div className="p-5">
              <h2
                className="text-2xl font-bold text-orange-600 cursor-pointer"
                onClick={() => openDialog(event)}
              >
                {event.title}
              </h2>
              <p className="mt-2 text-gray-700">{event.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold text-green-600 text-lg">₹{event.price}</span>
                <span className="text-sm text-gray-500 bg-yellow-100 px-3 py-1 rounded-full">
                  {event.date}
                </span>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          <Home /> Home
        </button>
      </div>

      {/* Modal Dialog */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <img
              src={selectedEvent.img}
              alt={selectedEvent.title}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-orange-600">{selectedEvent.title}</h2>
            <p className="mt-2 text-gray-700">{selectedEvent.description}</p>
            <p className="mt-2 font-semibold text-green-600">₹{selectedEvent.price}</p>
            <p className="mt-1 text-gray-500 text-sm">Date: {selectedEvent.date}</p>
            <button
              className="mt-6 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              onClick={() => handlePayment(selectedEvent)}
            >
              Get Passes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
