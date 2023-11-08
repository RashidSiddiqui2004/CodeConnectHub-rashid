import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

function SubmissitedResponses({ problemId }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      const responsesRef = collection(fireDB, 'submissions');
      const responsesQuery = query(responsesRef, where('problem_id', '==', problemId));

      try {
        const querySnapshot = await getDocs(responsesQuery);

        const responseData = [];
        querySnapshot.forEach((doc) => {
          responseData.push({ id: doc.id, ...doc.data() });
        });

        setResponses(responseData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchResponses();
  }, [problemId]);

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold text-green-400 underline mb-4">Most Upvoted Submissions</h2>
      <div className="space-y-6">
        {responses.map((response) => (
          <div key={response.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <img
                src="/user.jpg"
                alt={response.author}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div>
                <span className="font-semibold text-gray-700">Author: {response.author}</span>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-800">Approach</h3>
                  <p className="text-gray-800 mt-2">{response.approach}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Solution</h3>
                  <p className="text-gray-800 mt-2">{response.solution}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmissitedResponses;



// import { useEffect, useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { fireDB } from '../../firebase/FirebaseConfig';// Replace with your Firebase configuration

// function SubmissitedResponses({ problemId }) {
//   const [responses, setResponses] = useState([]);

//   useEffect(() => { 
//     async function fetchResponses() {
//       const responsesRef = collection(fireDB, 'submissions'); // Assuming your collection is named 'comments'
//       const responsesQuery = query(responsesRef, where('problem_id', '==', problemId));

//       try {
//         const querySnapshot = await getDocs(responsesQuery);

//         const responseData = [];
//         querySnapshot.forEach((doc) => {
//             responseData.push({ id: doc.id, ...doc.data() });
//         });

//         setResponses(responseData);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     }

//     fetchResponses();
//   }, [problemId]);

//   return (
//     <div className="my-6 w-[600px] mx-[25%]">
//       <h2 className="text-2xl font-semibold text-blue-700 underline mb-4">Past Submissions</h2>
//       <div className="space-y-4">
//         {responses.map((response) => (
//           <div key={response.id} className="bg-white p-4 rounded-lg shadow-md">
//             <div className="flex items-center">
//               <img
//               src="/user.jpg"
//                 // src={comment.userAvatar} // Replace with the user's avatar URL
//                 // alt={comment.userName}
//                 className="w-10 h-10 rounded-full object-cover mr-2"
//               />
//               {/* <span className="font-semibold text-gray-700">UserRandom</span> */}
//               <span className="font-semibold text-gray-700">{response.author}</span>
//             </div>
//             <p className="text-gray-800 mt-2">{response.approach}</p>

//             <p className="text-gray-800 mt-2">{response.solution}</p>
//           </div>
//         ))}
//       </div>
//     </div> 
//   );
// }

// export default SubmissitedResponses;