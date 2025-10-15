import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import { useAuth } from '../data/AuthContext'

// const events = [
//   { id: 1, name: "Tech Conference", location: "Budapest", date: "2025-10-05", description: "A great tech event..." },
//   { id: 2, name: "Music Festival", location: "Debrecen", date: "2025-11-12", description: "Enjoy music and fun..." }
// ];




function Events() {
  const events = useAuth().events;
  console.log(events);
  return (
    <div className='bg-[#D9D9D9] flex flex-col items-center justify-center w-full'>

      <div className="w-full px-20 mt-20">
        <h1 className="text-3xl text-[#a3301e] my-7">Our Events</h1>
      </div>
      <div className='w-full px-20 flex flex-col gap-10 mt-5 mb-10 items-center'>
        {events.map(event => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard
              name={event.title}
              description={event.content}
              location={event.location}
              date={Date(event.timestamp).toString().slice(0, 15)}
            />
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Events