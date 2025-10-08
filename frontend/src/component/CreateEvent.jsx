import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    image: null,
    preview: null,
  });
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Load events from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("events");
    setEvents(stored ? JSON.parse(stored) : []);
  }, []);

  // Update localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Convert image file to Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // handle image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setEventData({
        ...eventData,
        image: file,
        preview: base64, // use base64 for preview and storage
      });
    }
  };

  // handle submit (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Edit mode
      const updatedEvents = events.map((ev) =>
        ev.id === editId
          ? {
              ...ev,
              title: eventData.title,
              description: eventData.description,
              price: Number(eventData.price),
              date: eventData.date,
              img: eventData.preview || ev.img, // use base64 or previous img
            }
          : ev
      );
      setEvents(updatedEvents);
      setEditId(null);
    } else {
      // Create mode
      const newEvent = {
        id: Date.now(),
        title: eventData.title,
        description: eventData.description,
        price: Number(eventData.price),
        date: eventData.date,
        img: eventData.preview || "/happy-navratri-wishes.webp", // use base64 or default
      };
      setEvents([...events, newEvent]);
    }
    setEventData({
      title: "",
      description: "",
      price: "",
      date: "",
      image: null,
      preview: null,
    });
  };

  // handle edit
  const handleEdit = (event) => {
    setEditId(event.id);
    setEventData({
      title: event.title,
      description: event.description,
      price: event.price,
      date: event.date,
      image: null,
      preview: event.img,
    });
  };

  // handle delete
  const handleDelete = (id) => {
    const updatedEvents = events.filter((ev) => ev.id !== id);
    setEvents(updatedEvents);
    // If editing the deleted event, reset form
    if (editId === id) {
      setEditId(null);
      setEventData({
        title: "",
        description: "",
        price: "",
        date: "",
        image: null,
        preview: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-ornge to-orange-100 flex flex-col items-center p-6 relative">
      {/* Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 right-6 bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition"
      >
        Dashboard
      </button>
      <div className="w-full max-w-lg bg-white p-6 hover:shadow-lg-2xl rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editId ? "Edit Event" : "Create Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={eventData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full p-3 border rounded-lg"
          />

          {/* Image Preview */}
          {eventData.preview && (
            <img
              src={eventData.preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editId ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>

      {/* Event List */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-center">Your Events</h3>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-orange-50 rounded-xl shadow p-4 flex flex-col"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="h-32 w-full object-cover rounded mb-2"
                />
                <h4 className="font-bold text-lg text-orange-700">
                  {event.title}
                </h4>
                <p className="text-gray-700">{event.description}</p>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-green-700 font-semibold">
                    ₹{event.price}
                  </span>
                  <span className="text-gray-500">{event.date}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
