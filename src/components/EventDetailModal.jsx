import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function EventDetailModal({ event, onClose }) {
  const [openBooking, setOpenBooking] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-3 md:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-white rounded-xl sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl my-4 sm:my-4">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900 transition-all min-w-[44px] min-h-[44px]"
          aria-label="Close"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5 sm:p-6 md:p-6 lg:p-8">
          {/* Event Poster - Responsive Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 shadow-lg max-w-full">
            <img
              src={event.poster || "/default_poster.jpg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="mt-4 sm:mt-5 md:mt-6">
            {/* Type and Date */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm flex-wrap">
              <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full bg-[#1f3492]/10 text-[#1f3492] font-medium text-[10px] sm:text-xs">
                {event.type}
              </span>
              <span className="text-slate-600 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 leading-tight text-center">
              {event.title}
            </h2>

            {/* Description */}
            <div className="mt-3 sm:mt-4 md:mt-6">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">About This Event</h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Speakers */}
            {((event.speakers && event.speakers.length > 0) || event.speaker) && (
              <div className="mt-3 sm:mt-4 md:mt-6">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
                  {event.speakers && event.speakers.length > 1 ? "Speakers" : "Speaker"}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* Handle both speakers array and single speaker object */}
                  {event.speakers ? (
                    event.speakers.map((speaker, index) => (
                      <div key={index} className="bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#1f3492]/20">
                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
                            {speaker.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            {speaker.role && (
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs font-semibold rounded-full bg-[#1f3492] text-white">
                                  {speaker.role}
                                </span>
                              </div>
                            )}
                            <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 mt-1">{speaker.name}</h4>
                            <p className="text-[10px] sm:text-xs md:text-sm text-[#1f3492] font-medium mt-1">{speaker.title}</p>
                            {speaker.bio && (
                              <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 mt-1 sm:mt-2">{speaker.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : event.speaker ? (
                    <div className="bg-gradient-to-br from-[#1f3492]/10 to-[#c8348f]/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#1f3492]/20">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#1f3492] to-[#c8348f] flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold">
                          {event.speaker.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base sm:text-lg font-bold text-slate-900">{event.speaker.name}</h4>
                          <p className="text-xs sm:text-sm text-[#1f3492] font-medium mt-1">{event.speaker.title}</p>
                          {event.speaker.bio && (
                            <p className="text-xs sm:text-sm text-slate-600 mt-2">{event.speaker.bio}</p>
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
              <div className="mt-3 sm:mt-4 md:mt-6">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">What You'll Learn</h3>
                <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm text-slate-700">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1f3492] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* WhatsApp Group Link (for Upcoming events with WhatsApp group) */}
            {event.type === "Upcoming" && event.whatsappGroupUrl && (
              <div className="mt-3 sm:mt-4 md:mt-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-green-900 mb-1">Join WhatsApp Group</h4>
                      <p className="text-xs sm:text-sm text-green-700 mb-2">Stay connected and get updates about this event!</p>
                      <a
                        href={event.whatsappGroupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-all"
                      >
                        Join Group
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 md:mt-8 flex flex-wrap gap-3 sm:gap-3 md:gap-4 justify-center">
              {event.type === "Past" && (
                <button
                  onClick={() => setOpenBooking(true)}
                  className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium shadow-lg hover:shadow-xl hover:brightness-110 transition-all min-h-[48px]"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Book Recording
                </button>
              )}

              {event.type === "Upcoming" && event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium shadow-lg hover:shadow-xl hover:brightness-110 transition-all min-h-[48px]"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Register Now
                </a>
              )}

              {event.type === "Upcoming" && !event.registrationUrl && (
                <a
                  href="mailto:connect.atspeaks@gmail.com?subject=Event%20Registration"
                  className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base rounded-full bg-gradient-to-r from-[#1f3492] to-[#c8348f] text-white font-medium shadow-lg hover:shadow-xl hover:brightness-110 transition-all min-h-[48px]"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Register Now
                </a>
              )}

              <a
                href="mailto:connect.atspeaks@gmail.com"
                className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base rounded-full border-2 border-[#1f3492] text-[#1f3492] font-medium hover:bg-[#1f3492]/10 transition-all min-h-[48px]"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
