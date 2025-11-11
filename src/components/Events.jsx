import React, { useState, useEffect } from "react";
import EventDetailModal from "./EventDetailModal";
import BookingModal from "./BookingModal";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/events"
        );
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Show only first 3 events initially, or all if showAll is true
  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <section id="events" className="mt-20">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Events</h2>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2"></div>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium text-[#1f3492] hover:underline cursor-pointer"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>

      {/* Events Grid */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {loading ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-600">
            Loading events...
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-600">
            No events found.
          </div>
        ) : (
          displayedEvents.map((e) => (
            <div
              key={e._id}
              className="
                p-[1px]
                rounded-2xl
                bg-gradient-to-br
                from-[#1f3492]/20
                via-[#c8348f]/10
                to-transparent
                hover:shadow-lg
                transition-all
              "
            >
              <div
                className="
                  bg-white
                  rounded-2xl
                  p-5
                  shadow-sm
                  backdrop-blur
                  border border-white/60
                  hover:-translate-y-1
                  transition-all
                "
              >

                {/* ✅ Poster (1:1) */}
                <div className="w-full aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10">
                  <img
                    src={e.poster || "/default_poster.jpg"}
                    alt={e.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* ✅ Type + Date */}
                <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
                  <span className="px-2 py-[2px] rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium">
                    {e.type}
                  </span>
                  <span>{e.date}</span>
                </div>

                {/* ✅ Title */}
                <h3 className="mt-3 text-lg font-semibold text-slate-900 leading-snug">
                  {e.title}
                </h3>

                {/* ✅ Description */}
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {e.description}
                </p>

                {/* ✅ Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setSelectedEvent(e)}
                    className="
                      inline-block
                      px-4 py-2
                      rounded-full
                      bg-gradient-to-r
                      from-[#1f3492] to-[#c8348f]
                      text-white
                      text-sm
                      font-medium
                      shadow
                      hover:brightness-95
                      cursor-pointer
                    "
                  >
                    Details
                  </button>

                  {/* Book Recording for Past events only */}
                  {e.type === "Past" && (
                    <button
                      onClick={() => {
                        setBookingEvent(e);
                        setOpenBooking(true);
                      }}
                      className="
                        inline-block
                        px-4 py-2
                        rounded-full
                        border border-[#1f3492]
                        text-[#1f3492]
                        text-sm font-medium
                        shadow-sm
                        hover:bg-[#1f3492]/10
                        cursor-pointer
                      "
                    >
                      Book Recording
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Booking Modal */}
      <BookingModal
        event={bookingEvent}
        open={openBooking}
        onClose={() => {
          setOpenBooking(false);
          setBookingEvent(null);
        }}
      />
    </section>
  );
}
