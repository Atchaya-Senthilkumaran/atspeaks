import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function EventDetailModal({ event, onClose }) {
  const [openBooking, setOpenBooking] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl my-2 sm:my-4">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900 transition-all"
          aria-label="Close"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Event Poster */}
          <div className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 shadow-lg max-w-full">
            <img
              src={event.poster || "/default_poster.jpg"}
              alt={event.title}
              className="w-full h-full object-cover max-w-full"
            />
          </div>

          {/* Event Details */}
          <div className="mt-4 sm:mt-6">
            {/* Type and Date */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
              <span className="px-2 sm:px-3 py-1 rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium">
                {event.type}
              </span>
              <span className="text-slate-600 flex items-center gap-1 sm:gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight text-center">
              {event.title}
            </h2>

            {/* Description */}
            <div className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">About This Event</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Speakers */}
            {((event.speakers && event.speakers.length > 0) || event.speaker) && (
              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
                  {event.speakers && event.speakers.length > 1 ? "Speakers" : "Speaker"}
                </h3>
                <div className="space-y-4">
                  {/* Handle both speakers array and single speaker object */}
                  {event.speakers ? (
                    event.speakers.map((speaker, index) => (
                      <div key={index} className="bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 rounded-xl p-3 sm:p-4 border border-[#1f3492]/20">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold">
                            {speaker.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            {speaker.role && (
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-[#1f3492] text-white">
                                  {speaker.role}
                                </span>
                              </div>
                            )}
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{speaker.name}</h4>
                            <p className="text-xs sm:text-sm text-[#1f3492] font-medium mt-1">{speaker.title}</p>
                            {speaker.bio && (
                              <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2">{speaker.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : event.speaker ? (
                    <div className="bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 rounded-xl p-4 border border-[#1f3492]/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white text-2xl font-bold">
                          {event.speaker.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-900">{event.speaker.name}</h4>
                          <p className="text-sm text-[#1f3492] font-medium mt-1">{event.speaker.title}</p>
                          {event.speaker.bio && (
                            <p className="text-sm text-slate-600 mt-2">{event.speaker.bio}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Event Highlights */}
            {event.highlights && (
              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">What You'll Learn</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1f3492] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center">
              {event.type === "Past" && (
                <button
                  onClick={() => setOpenBooking(true)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Book Recording
                </button>
              )}

              {event.type === "Upcoming" && (
                <a
                  href="mailto:connect.atspeaks@gmail.com?subject=Event%20Registration"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Register Now
                </a>
              )}

              <a
                href="mailto:connect.atspeaks@gmail.com"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full border-2 border-[#1f3492] text-[#1f3492] font-medium hover:bg-[#1f3492]/10 transition-all"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal event={event} open={openBooking} onClose={() => setOpenBooking(false)} />
    </div>
  );
}
