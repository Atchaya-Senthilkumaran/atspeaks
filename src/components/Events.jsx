import React, { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import EventDetailModal from "./EventDetailModal";
import BookingModal from "./BookingModal";
import API_URL from "../config/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.1 });

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('🔗 Fetching events from:', API_URL);
        const res = await fetch(`${API_URL}/api/events`);

        console.log('📡 Response status:', res.status);
        console.log('📡 Response ok:', res.ok);

        // Parse JSON response
        let data;
        try {
          data = await res.json();
        } catch (parseError) {
          console.error('❌ Failed to parse JSON response:', parseError);
          const text = await res.text().catch(() => '');
          console.error('❌ Response text:', text);
          throw new Error(`Failed to parse response: ${text}`);
        }

        // Handle response - events API should always return an array
        if (Array.isArray(data)) {
          console.log('✅ Events fetched successfully:', data.length, 'events');
          setEvents(data);
        } else if (data.events && Array.isArray(data.events)) {
          // Handle error response that contains events array
          console.log('✅ Using events from response object:', data.events.length, 'events');
          setEvents(data.events);
        } else if (!res.ok && data.error) {
          // Error response without events
          console.warn('⚠️ API returned error:', data.error);
          console.warn('⚠️ Message:', data.message);
          // Use empty array to show "No events found"
          setEvents([]);
        } else {
          console.error('❌ Invalid response format:', data);
          setEvents([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch events:", error);
        console.error("API URL was:", API_URL);
        console.error("Error details:", error.message);
        // Set empty array on error so user sees "No events found" instead of loading forever
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Show only first 3 events initially, or all if showAll is true
  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <section 
      id="events" 
      ref={sectionRef}
      className={`mt-12 sm:mt-16 md:mt-20 w-full overflow-x-hidden scroll-reveal ${isRevealed ? 'revealed' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3 animate-fade-in">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Events</h2>
          <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2"></div>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[10px] sm:text-xs md:text-sm font-medium text-[#1f3492] hover:underline cursor-pointer px-2 py-1 hover:scale-105 transition-transform duration-300"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>

      {/* Events Grid - Mobile First: 1 column on mobile, 2 columns on sm+, 3 columns on lg+ */}
      <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
        {loading ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-600">
            Loading events...
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-600">
            No events found.
          </div>
        ) : (
          displayedEvents.map((e, index) => {
            const delay = index * 0.1;
            return (
            <div
              key={e._id}
              className="p-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/10 to-transparent hover:shadow-lg transition-all duration-300 w-full hover-lift"
              style={{ 
                animation: `fadeIn 0.6s ease-out ${delay}s forwards`,
                opacity: 0
              }}
            >
              <div
                className="
                  bg-white
                  rounded-xl sm:rounded-2xl
                  p-4 sm:p-5
                  shadow-sm
                  backdrop-blur
                  border border-white/60
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  w-full
                "
              >
                {/* Poster - Responsive Image */}
                <div className="w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10">
                  <img
                    src={e.poster || "/default_poster.jpg"}
                    alt={e.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Type + Date */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4">
                  <span className="px-2 py-[2px] rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium text-[10px] sm:text-xs">
                    {e.type}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm">{e.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {e.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {e.description}
                </p>

                {/* Buttons */}
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={() => setSelectedEvent(e)}
                    className="
                      inline-block
                      px-3 sm:px-4 py-1.5 sm:py-2
                      rounded-full
                      bg-gradient-to-r
                      from-[#1f3492] to-[#c8348f]
                      text-white
                      text-xs sm:text-sm
                      font-medium
                      shadow
                      hover:brightness-95
                      hover:scale-105
                      cursor-pointer
                      whitespace-nowrap
                      transition-all
                      duration-300
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
                        px-3 sm:px-4 py-1.5 sm:py-2
                        rounded-full
                        border border-[#1f3492]
                        text-[#1f3492]
                        text-xs sm:text-sm font-medium
                        shadow-sm
                        hover:bg-[#1f3492]/10
                        hover:scale-105
                        cursor-pointer
                        whitespace-nowrap
                        transition-all
                        duration-300
                      "
                    >
                      Book Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
            );
          })
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
