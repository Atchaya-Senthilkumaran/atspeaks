import React, { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import EventDetailModal from "./EventDetailModal";
import BookingModal from "./BookingModal";
import RegistrationModal from "./RegistrationModal";
import API_URL from "../config/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(true); // Show all events by default
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [registrationEvent, setRegistrationEvent] = useState(null);
  const [openRegistration, setOpenRegistration] = useState(false);
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

  // Normalize events
  const normalizedEvents = events
    .filter((e) => {
      // Filter out events that are missing critical fields
      if (!e || !e._id || !e.title) {
        return false;
      }
      return true;
    })
    .map((e) => {
      // Fix Internmania casing
      if (e?.title?.toLowerCase() === "internmania") {
        return {
          ...e,
          title: "Internmania"
        };
      }
      if (e?.title?.toLowerCase() === "portfolio launchpad") {
        return {
          ...e,
          type: "Past",
          recordingAvailable: true,
          price: e.price && e.price > 0 ? e.price : 199,
        };
      }
      return e;
    });

  // CHECK IF LINKEDIN WRAPPED IS MISSING AND INJECT IT
  const hasLinkedInWrapped = normalizedEvents.some(e => e.title.toLowerCase() === "linkedin wrapped");
  
  const finalEvents = [...normalizedEvents];
  
  if (!hasLinkedInWrapped) {
    console.log('🛡️ Injecting missing LinkedIn Wrapped event into frontend');
    finalEvents.push({
      _id: "injected-linkedin-wrapped",
      title: "LinkedIn Wrapped",
      date: "2026-01-25",
      type: "Past",
      description: "LinkedIn profile building strategies session. Learn how to optimize your LinkedIn presence for career growth and networking opportunities.",
      poster: "/posters/16.png",
      price: 299,
      recordingAvailable: true,
      isVisible: true,
      highlights: ["LinkedIn profile optimization", "Professional networking strategies", "Career growth tactics"],
      speakers: [
        {"role": "Speaker", "name": "Atchaya Senthilkumaran", "title": "Founder & CEO, AT Speaks", "bio": "Tech educator and founder specializing in career development and professional networking strategies"}
      ]
    });
  }

  // Final sorting to ensure chronological order (Newest first)
  const sortedEvents = [...finalEvents].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Log total events for debugging
  console.log(`📊 Final events to display: ${sortedEvents.length}`);

  // Show all events by default, or limit to 3 if showAll is false
  const displayedEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3);
  
  return (
    <section
      id="events"
      ref={sectionRef}
      className={`py-7 w-full scroll-reveal-3d ${isRevealed ? 'revealed' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3 animate-bounce-in">
        <div className="inline-block">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 break-words">Events</h2>
          <div className="h-1 w-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] rounded-full mt-2 animate-glow-pulse shadow-lg shadow-[#c8348f]/30"></div>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[10px] sm:text-xs md:text-sm font-medium text-[#1f3492] hover:underline cursor-pointer px-2 py-1 hover:scale-110 hover-rotate transition-all duration-300"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>

      {/* Events Grid */}
      <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full overflow-visible">
        {loading ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-600 animate-pulse-slow">
            Loading events...
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-600">
            No events found.
          </div>
        ) : (
          displayedEvents.map((e, index) => {
            const delay = index * 0.15;
            const animationType = index % 3 === 0 ? 'animate-3d-pop' : index % 3 === 1 ? 'animate-bounce-in' : 'animate-slide-up-rotate';
            return (
            <div
              key={e._id || `event-${index}`}
              className={`p-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1f3492]/20 via-[#c8348f]/10 to-transparent hover:shadow-2xl transition-all duration-500 w-full hover-3d-tilt perspective-3d ${animationType}`}
              style={{ 
                animationDelay: `${delay}s`,
                opacity: 1
              }}
            >
              <div
                className="
                  bg-white
                  rounded-xl sm:rounded-2xl
                  p-4 sm:p-5
                  shadow-lg
                  backdrop-blur
                  border border-white/60
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  w-full
                "
              >
                {/* Poster */}
                <div className="w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 relative group">
                  <img
                    src={e.poster || "/default_poster.jpg"}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Type + Date */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4">
                  <span className="px-2 py-[2px] rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium text-[10px] sm:text-xs">
                    {e.type}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm">{e.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-slate-900 leading-snug hover:text-[#1f3492] transition-colors duration-300 break-words">
                  {e.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 break-words">
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
                      shadow-lg
                      hover:brightness-110
                      hover:scale-110
                      cursor-pointer
                      whitespace-nowrap
                      transition-all
                      duration-300
                    "
                  >
                    Details
                  </button>

                  {e.recordingAvailable !== false && e.price > 0 ? (
                    <button
                      onClick={() => {
                        setBookingEvent(e);
                        setOpenBooking(true);
                      }}
                      className="
                        inline-block
                        px-3 sm:px-4 py-1.5 sm:py-2
                        rounded-full
                        border-2 border-[#1f3492]
                        text-[#1f3492]
                        text-xs sm:text-sm font-medium
                        shadow-md
                        hover:bg-[#1f3492]
                        hover:text-white
                        hover:scale-110
                        cursor-pointer
                        whitespace-nowrap
                        transition-all
                        duration-300
                      "
                    >
                      Book Recording
                    </button>
                  ) : e.type === "Upcoming" && e.registrationUrl ? (
                    <button
                      onClick={() => {
                        setRegistrationEvent(e);
                        setOpenRegistration(true);
                      }}
                      className="
                        inline-block
                        px-3 sm:px-4 py-1.5 sm:py-2
                        rounded-full
                        border-2 border-[#1f3492]
                        text-[#1f3492]
                        text-xs sm:text-sm font-medium
                        shadow-md
                        hover:bg-[#1f3492]
                        hover:text-white
                        hover:scale-110
                        cursor-pointer
                        whitespace-nowrap
                        transition-all
                        duration-300
                      "
                    >
                      Register Now
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      <BookingModal
        event={bookingEvent}
        open={openBooking}
        onClose={() => {
          setOpenBooking(false);
          setBookingEvent(null);
        }}
      />
      <RegistrationModal
        event={registrationEvent}
        open={openRegistration}
        onClose={() => {
          setOpenRegistration(false);
          setRegistrationEvent(null);
        }}
      />
    </section>
  );
}
