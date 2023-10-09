
// import React, { useContext, useEffect, useState } from 'react'
// import Layout from '../../components/layout/Layout'
// import myContext from '../../context/data/myContext';
// import { useParams } from 'react-router'; 
// import { doc, getDoc } from 'firebase/firestore'; 
// import { fireDB } from '../../fireabase/FirebaseConfig'; 
// import { auth } from '../../fireabase/FirebaseConfig'; 
// import Submission from './Submission';
// import SubmissitedResponses from './SubmittedResponses';

// function ChallengeInfo() {
//     const context = useContext(myContext);
//     const { loading, setLoading} = context;

//     const [challenge, setChallenge] = useState('')
//     const params = useParams()

//     const getChallengeData = async () => {
//         setLoading(true)
//         try {
//             const productTemp = await getDoc(doc(fireDB, "challenges", params.id))
//             setChallenge(productTemp.data());
//             setLoading(false)
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }

//     async function likePost(){
//         const userId = auth.currentUser.uid;
//     }


//     useEffect(() => {
//         getChallengeData()
//         .then(()=> {
//             // taglist = challenge.tags.split(", ");
//             // console.log(challenge);
//         })
//     }, [])


//     return (
//         <Layout>
//             <section className="text-gray-600 body-font overflow-hidden">
//                 <div className="container px-5 py-10 mx-auto">
//                     {challenge &&
//                         <div className="lg:w-4/5 mx-auto flex flex-wrap">

//                             {/* <img
//                                 alt="postImage"
//                                 className="w-1/2 md:w-2/3 lg:w-2/3 h-auto max-h-[400px] mx-[17%] object-cover object-center rounded"
//                                 src={poststate.imageUrl}
//                             />  */}

//                             <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 mx-[17%]">

//                                 <h2 className="text-sm title-font text-gray-500 tracking-widest">
//                                     Author: {challenge.author ? challenge.author : "Rashid"}
//                                 </h2>
//                                 <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
//                                     {challenge.title}
//                                 </h1>
//                                 <div className="flex mb-4">
//                                     <span className="flex items-center">

//                                         <span className="text-gray-600 ml-[150px]">{challenge.submissions ? challenge.submissions : 0} Submissions</span>

//                                     </span>
//                                     <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
//                                         <a className="text-gray-500">
//                                             <svg
//                                                 fill="currentColor"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 className="w-5 h-5"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
//                                             </svg>
//                                         </a>
//                                         <a className="text-gray-500">
//                                             <svg
//                                                 fill="currentColor"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 className="w-5 h-5"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
//                                             </svg>
//                                         </a>
//                                         <a className="text-gray-500">
//                                             <svg
//                                                 fill="currentColor"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 className="w-5 h-5"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
//                                             </svg>
//                                         </a>
//                                     </span>
//                                 </div>

//                                 <div className="flex flex-wrap items-center justify-center my-4 mx-auto p-4 max-w-2xl bg-red-300 text-blue-800 rounded-lg shadow-md">
//                                     <span className="font-bold text-lg mr-2">Tags:  {challenge.tags}</span>
//                                 </div>

//                                 <h2 className='underline cursor-pointer py-2'>Problem Statement</h2>

//                                 <p className="leading-relaxed border-b-2 mb-5 pb-5 text-lg text-slate-800">
//                                     {challenge.problemStatement}
//                                 </p>

//                                 <div className="flex">
//                                     <button onClick={() => likePost()} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
//                                         Support Challenge
//                                     </button>

//                                     <button onClick={() => likePost()} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
//                                         <svg
//                                             fill="currentColor"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             className="w-5 h-5"
//                                             viewBox="0 0 24 24"
//                                         >
//                                             <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
//                                         </svg>
//                                     </button>
//                                 </div>

//                                 {/* <div className="flex flex-row items-center my-10 w-[300px] mx-[20%]">
//                                     <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-l-lg focus:outline-none w-1/2">
//                                         Start a Thread
//                                     </button> 
//                                 </div>  */}

//                             </div>
//                         </div>}

//                         <Submission problem_id={params.id}/>

//                     <SubmissitedResponses problemId={params.id} />
//                 </div>
//             </section>

//         </Layout>
//     )
// }

// export default ChallengeInfo


import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { auth } from '../../fireabase/FirebaseConfig';
import Submission from './Submission';
import SubmissitedResponses from './SubmittedResponses';

function ChallengeInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [challenge, setChallenge] = useState('');
  const params = useParams();

  const getChallengeData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, 'challenges', params.id));
      setChallenge(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function likePost() {
    const userId = auth.currentUser.uid;
  }

  useEffect(() => {
    getChallengeData();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {challenge && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap flex-col items-center justify-center sm:flex-row">
              <div className="w-full sm:w-2/3 sm:pl-10 sm:py-6 mt-6 sm:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Author: {challenge.author ? challenge.author : 'Rashid'}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {challenge.title}
                </h1>
                <div className="flex flex-wrap mb-4">
                  <span className="flex items-center">
                    <span className="text-gray-600 ml-2">
                      {challenge.submissions ? challenge.submissions : 0} Submissions
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        {/* Like icon */}
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        {/* Share icon */}
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        {/* Bookmark icon */}
                      </svg>
                    </a>
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center my-4 p-4 max-w-2xl bg-red-300 text-blue-800 rounded-lg shadow-md">
                  <span className="font-bold text-lg mr-2">Tags: {challenge.tags}</span>
                </div>
                <h2 className="underline cursor-pointer py-2">Problem Statement</h2>
                <p className="leading-relaxed border-b-2 mb-5 pb-5 text-lg text-slate-800">
                  {challenge.problemStatement}
                </p>
                <div className="flex">
                  <button
                    onClick={() => likePost()}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Support Challenge
                  </button>
                  <button
                    onClick={() => likePost()}
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      {/* Heart icon */}
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
 
                </div>
              </div>
              {/* Submission component */}
              <div className="w-full lg:w-[2300px] sm:w-1/2 mt-6 sm:mt-0">
                <Submission problem_id={params.id} />
              </div>
            </div>
          )}
          <SubmissitedResponses problemId={params.id} />
        </div>
      </section>
    </Layout>
  );
}

export default ChallengeInfo;
