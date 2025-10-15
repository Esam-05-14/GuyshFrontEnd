import { useParams } from "react-router-dom";


const events = [
  { id: 1, name: "Tech Conference", location: "Budapest", date: "2025-10-05", description: "A great tech event with talks, networking, and innovation showcases." },
  { id: 2, name: "Music Festival", location: "Debrecen", date: "2025-11-12", description: "Enjoy music, food, and cultural performances at this exciting festival." }
];

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) return <p className="text-center mt-10">Event not found</p>;

  return (

    
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      
      
      <div className="mt-6 rounded-md border border-gray-300 shadow p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-red-700">{event.name}</h1>
        <p className="text-gray-600 mt-2">{event.date} | {event.location}</p>

        <div className="mt-4">
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
      
    </div>
  );
}
