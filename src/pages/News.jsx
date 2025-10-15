import React from 'react'
import { data, Link } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import { useAuth } from '../data/AuthContext'


// const news = [
//   { id: 1, title: "Tech Conference", description: "A great tech event with talks, networking, and innovation showcases."  , date: '2005-10-05'},
//   { id: 2, title: "Music Festival", description: "Enjoy music, food, and cultural performances at this exciting festival.", date: '2005-10-05' }
// ];
// const news = fetch('http://127.0.0.1:8000/api/news/posts')
//   .then(response => response.json())
//   .then(data => data)
//   .catch(error => {
//     console.error('Error fetching news:', error);
//     return [];
//   });

// console.log(news);


function News() {
  const news = useAuth().posts;
  return (
    <div className='bg-[#D9D9D9] flex flex-col items-center justify-center w-full'>

      <div className="w-full px-20 mt-20">
        <h1 className="text-4xl font-bold text-[#a3301e] my-7">News</h1>
      </div>
      <div className='flex flex-col w-full px-20 gap-10 mt-5 mb-10 justify-items-center'>
        {news.map(n => (
          <Link key={n.id} to={`/news/${n.id}`}>
            <NewsCard
              title={n.title}
              content={n.content}
              date={Date(n.date).toString().slice(0, 15)}
              src={n.image}
            />
          </Link>
        ))}
      </div>

    </div>
  )
}

export default News