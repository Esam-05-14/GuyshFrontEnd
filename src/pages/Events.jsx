import React from 'react'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import { useAuth } from '../data/AuthContext'
import dayjs from 'dayjs'

function Events() {
  const events = useAuth().events;

  return (
    <div className="bg-[#D9D9D9]  min-h-screen flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full px-8 md:px-20 mt-20 text-center">
        <h1 className="text-3xl md:text-3xl  text-[#a3301e] mb-2">Our Events</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Discover upcoming events and activities organized by our team.
        </p>
      </div>
      
      {/* Event List */}
      <div className="w-full px-8 md:px-20 flex flex-col sm:flex-row flex-wrap justify-center gap-8 mt-10 mb-20">
        {events.map(event => {
          const formattedDate = dayjs(event.timestamp).format("dddd, MMMM D, YYYY h:mm A");

          return (
            <>
            <Link 
              key={event.id} 
              to={`/events/${event.id}`} 
              state={{ event }}
              className="max-w-sm w-full transform transition-transform hover:scale-105"
            >
              <EventCard
                src='/public/guysh1.jpg' //event.image
                name={event.title}
                description={event.content}
                location={event.location}
                date={formattedDate}
                className="shadow-lg rounded-xl bg-white hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between h-full"
              />
            </Link>
            <Link 
              key={event.id} 
              to={`/events/${event.id}`} 
              state={{ event }}
              className="max-w-sm w-full transform transition-transform hover:scale-105"
            >
              <EventCard
                src='/public/guysh1.jpg' //event.image
                name={event.title}
                description={event.content}
                location={event.location}
                date={formattedDate}
                className="shadow-lg rounded-xl bg-white hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between h-full"
              />
            </Link>
            <Link 
              key={event.id} 
              to={`/events/${event.id}`} 
              state={{ event }}
              className="max-w-sm w-full transform transition-transform hover:scale-105"
            >
              <EventCard
                src='/public/guysh1.jpg' //event.image
                name={event.title}
                description={event.content}
                location={event.location}
                date={formattedDate}
                className="shadow-lg rounded-xl bg-white hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between h-full"
              />
            </Link>
            </>
          )
        })}
      </div>

    </div>
  )
}

export default Events
