import { useParams, Link } from "react-router-dom";


const news = [
  { id: 1, title: "Tech Conference", description: "A great tech event with talks, networking, and innovation showcases." },
  { id: 2, title: "Music Festival", description: "Enjoy music, food, and cultural performances at this exciting festival." }
];

export default function NewsDetails() {
  const { id } = useParams();
  const news_ = news.find((e) => e.id === parseInt(id));

  if (!news_) return <p className="text-center mt-10">News not found</p>;

  return (

    
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      
      
      <div className="mt-6 rounded-md border border-gray-300 shadow p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-red-700">{news_.title}</h1>

        <div className="mt-4">
          <p className="text-gray-700 leading-relaxed">{news_.description}</p>
        </div>
      </div>
      
    </div>
  );
}
