
// import React, { useEffect, useContext } from 'react'
// import myContext from '../../context/data/myContext'


// function Challenge() {

//     const context = useContext(myContext)
//     const { challenge, setChallenge } = context

//     const addChl = () => {
//         window.location.href = '/submitChallenge';
//     }

//     return (

//         <>
//             <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-800 text-white py-10">
//                 <header className="py-12 text-center">
//                     <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
//                         Welcome to ChallengeHub
//                     </h1>
//                     <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
//                         Explore exciting challenges and showcase your skills!
//                     </p>
//                     <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-full animate__animated animate__bounce animate__delay-3s">
//                         Get Started
//                     </button>
//                 </header>

//                 <div className='mx-[43%] py-4'>
//                     <button onClick={addChl} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out">
//                         <span>Add Challenge</span>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                         </svg>
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
//                     {challenge.map((challengeItem) => {
//                         const tags = challengeItem.tags;
//                         const tagList = tags.split(", ");
//                         return (
//                             <div
//                                 key={challengeItem.time}
//                                 className="bg-gradient-to-t from-green-400 via-green-300 to-green-400 p-4 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
//                             >
//                                 <h3 className="text-xl mb-2 text-center hover:text-red-400 font-semibold">
//                                     {challengeItem.title}
//                                 </h3>
//                                 <p className="text-white">
//                                     {challengeItem.problemStatement.length > 150
//                                         ? `${challengeItem.problemStatement.slice(0, 150)}...`
//                                         : challengeItem.problemStatement}
//                                 </p> 
//                                 <div className="flex flex-wrap gap-2 my-2">
//                                     {tagList.map((tag, index) => (
//                                         <div
//                                             key={index}
//                                             className="bg-blue-500 text-white rounded-full py-1 px-2 text-sm"
//                                         >
//                                             {tag}
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="mt-2">
//                                     <p className="text-red-500 text-l hover:text-red-400">
//                                         User: {challengeItem.author}
//                                     </p>
//                                 </div>

//                                 <a
//                                     href={`/challengeInfo/${challengeItem.id}`}
//                                     className="text-black hover:underline mt-2 inline-block bg-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
//                                 >
//                                     View Details
//                                 </a>
//                             </div>
//                         );
//                     })}
//                 </div>

//             </div>
//         </>
//     );
// }

// export default Challenge;


// Dark Batman Theme

import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Navbar from '../../components/navbar/Navbar';


function Challenge() {
  const context = useContext(myContext);
  const { challenge } = context;

  const addChl = () => {
    window.location.href = '/submitChallenge';
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-900 text-white py-10">
        <header className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Welcome to ChallengeHub
          </h1>
          <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Explore exciting challenges and showcase your skills!
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-full animate__animated animate__bounce animate__delay-3s">
            Get Started
          </button>
        </header>

        <div className="mx-auto w-full max-w-md py-4">
          <button
            onClick={addChl}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 mx-[135px] rounded-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
          >
            <span>Add Challenge</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
          {challenge.map((challengeItem) => {
            const tags = challengeItem.tags;
            const tagList = tags.split(', ');
            return (
              <div
                key={challengeItem.time}
                className="bg-gray-800 p-4 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <h3 className="text-xl mb-2 text-center hover:text-red-400 font-semibold">
                  {challengeItem.title}
                </h3>
                <p className="text-gray-300">
                  {challengeItem.problemStatement.length > 150
                    ? `${challengeItem.problemStatement.slice(0, 150)}...`
                    : challengeItem.problemStatement}
                </p>
                <div className="flex flex-wrap gap-2 my-2">
                  {tagList.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 text-white rounded-full py-1 px-2 text-sm"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <p className="text-red-500 text-l hover:text-red-400">
                    User: {challengeItem.author}
                  </p>
                </div>

                <a
                  href={`/challengeInfo/${challengeItem.id}`}
                  className="text-black hover:underline mt-2 inline-block bg-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                  View Details
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Challenge;

