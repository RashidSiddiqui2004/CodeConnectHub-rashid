import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function CodingForumFeatures() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div>
      <section>
        <div className="container mx-auto px-5 md:py-5">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <svg
                  className="text-blue-600 w-12 h-12 mb-3 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>

                <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Code Snippets
                </h2>
                <p className="leading-relaxed">
                  Share your favorite code snippets and discuss coding techniques with the community.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <svg
                  className="text-blue-600 w-12 h-12 mb-3 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.294 7.293a1 1 0 00-1.414-1.414l-4 4a1 1 0 001.414 1.414l4-4z"
                  />
                </svg>

                <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Coding Challenges
                </h2>
                <p className="leading-relaxed">
                  Participate in coding challenges, test your skills, and compete with other programmers.
                </p>
              </div>
            </div>

            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <svg
                  className="text-blue-600 w-12 h-12 mb-3 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>

                <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Coding Tips
                </h2>
                <p className="leading-relaxed">
                  Share and learn coding tips and tricks, best practices, and helpful resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CodingForumFeatures;
