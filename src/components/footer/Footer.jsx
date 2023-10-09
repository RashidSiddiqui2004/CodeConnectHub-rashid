
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';

function CodingForumFooter() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <footer className={`text-gray-600 body-font ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-300'} text-blue-900`}>
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">
              Categories
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-gray-800">
                  Coding Challenges
                </Link>
              </li>
              <li>
                <Link to="/snippets" className="hover:text-gray-800">
                  Code Snippets
                </Link>
              </li>
              {/* <li>
                <Link to="/tips" className="hover:text-gray-800">
                  Coding Tips
                </Link>
              </li> */}
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">
              Customer Service
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/returnpolicy" className="hover:text-gray-800">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase">
              Services
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/privacypolicy" className="hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <img src="/footer.jpg" alt="" srcSet="" />
          </div>
        </div>
      </div>
      <div className={`bg-gray-200 ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          <Link to="/" className="flex">
            <div className="flex">
              <h1 className={`text-2xl font-bold text-black px-2 py-1 rounded ${mode === 'dark' ? 'text-white' : ''}`}>
                CodeConnectHub
              </h1>
            </div>
          </Link>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © {new Date().getFullYear()} CodingForum —
            <a href="/" className={`text-gray-600 ml-1 ${mode === 'dark' ? 'text-white' : ''}`}>
              www.CodeConnectHub.com
            </a>
          </p>

          <a href='https://www.linkedin.com/in/rashid-siddiqui-b014ba264/' target='blank' className='mx-[10%] text-xl font-bold text-blue-500 hover:text-green-500 transform transition-transform hover:scale-105'>
            Rashid Siddiqui
          </a>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

            <a className="text-gray-500" href='https://www.linkedin.com/in/rashid-siddiqui-b014ba264/' target='blank' >
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500" href='https://www.linkedin.com/in/rashid-siddiqui-b014ba264/' target='blank' >
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx={4} cy={4} r={2} stroke="none" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default CodingForumFooter;

