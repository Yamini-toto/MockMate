import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import DashboardStats from './_components/DashboardStats'

const articles = [
  {
    title: 'Top 10 React Interview Questions',
    url: 'https://www.freecodecamp.org/news/top-react-interview-questions/',
    img: '/assets/topreact.png',
    source: 'freeCodeCamp',
  },
  {
    title: 'Ace Your Node.js Interview',
    url: 'https://blog.logrocket.com/node-js-interview-questions/',
    img: '/assets/ace_node.png',
    source: 'LogRocket',
  },
  {
    title: 'How to Improve Coding Interviews',
    url: 'https://www.geeksforgeeks.org/10-tips-to-crack-coding-interview/',
    img: '/assets/improve_coding.png',
    source: 'GeeksforGeeks',
  },
  {
    title: 'Mastering JavaScript Algorithms',
    url: 'https://www.educative.io/blog/javascript-algorithms-interview-questions',
    img: '/assets/master_js.png',
    source: 'Educative',
  },
  {
    title: 'Behavioral Interview Tips for Developers',
    url: 'https://www.interviewbit.com/blog/behavioral-interview-questions/',
    img: '/assets/behavior_tips.png',
    source: 'InterviewBit',
  },
  {
    title: 'System Design Interview Guide',
    url: 'https://www.interviewkickstart.com/learn/system-design-interview-questions',
    img: '/assets/system_design.png',
    source: 'Interview Kickstart',
  },
  {
    title: 'Data Structures for Coding Interviews',
    url: 'https://www.geeksforgeeks.org/data-structures/',
    img: '/assets/dsa.png',
    source: 'GeeksforGeeks',
  },
];

function ArticleSection() {
  return (
    <div className="bg-[#e1fffe] rounded-xl shadow p-4 min-h-[420px] w-full min-w-[220px] flex flex-col gap-3">
      <h3 className="font-bold text-md mb-2 text-[#0a3d62]">Learn & Improve</h3>
      <p className="text-xs text-[#0a3d62] mb-2">Access curated articles and resources to boost your skills in your chosen field.</p>
      {articles.map((a, i) => (
        <a
          key={i}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded hover:bg-[#C3FF93] transition-colors no-underline"
          style={{ textDecoration: 'none' }}
        >
          <img src={a.img} alt="article" className="w-10 h-10 rounded object-cover border" />
          <div>
            <div className="font-medium text-sm text-[#0a3d62]">{a.title}</div>
            <div className="text-xs text-gray-500">{a.source}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a7a77] p-4 md:p-8 lg:p-10">
      <h2 className="font-bold text-3xl text-[#e1fffe] mb-1 tracking-wide">Dashboard</h2>
      <h2 className="text-[#e1fffe] mb-6">Visualize strengths and weak areas with interactive charts and detailed feedback.</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Add Interview + Learn & Improve */}
        <div className="space-y-8 col-span-1">
          <h3 className="font-bold text-xl text-[#e1fffe] mb-2">Start New Interview</h3>
          <AddNewInterview />
          <ArticleSection />
        </div>
        {/* Right: Stats/Graphs (take full right width, stacked) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8 rounded-xl">
          <DashboardStats />
        </div>
      </div>
    </div>
  );
}
