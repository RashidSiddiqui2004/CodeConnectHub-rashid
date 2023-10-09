 
import React, { useState, useContext, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { auth } from '../../fireabase/FirebaseConfig';
import { getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from '../../fireabase/FirebaseConfig'; 
import { useParams } from 'react-router';

function Submission() { 
    const [language, setLanguage] = useState('javascript');  
  
    const context = useContext(myContext);
    const { submission, setSubmission, sendSubmission } = context;
    // to get the username
    async function getUsernameByUID(uid) {
      // Reference to the "users" collection
      const usersCollection = collection(fireDB, 'users');
  
      // Create a query to find the user with the specified UID
      const userQuery = query(usersCollection, where('uid', '==', uid));
  
      try {
        const querySnapshot = await getDocs(userQuery);
  
        if (!querySnapshot.empty) {
          // Retrieve the first (and hopefully only) document
          const userDoc = querySnapshot.docs[0];
          // Extract the username (name) field
          const username = userDoc.data().name; 
  
          return username;
        } else {
          console.log('User not found.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
  
      return null;
  
    }

    const params = useParams()
 
 
    submission.problem_id = params.id;

    let uid;

    try {
        uid = auth.currentUser.uid;
    } catch (err) {
        console.error("error", err);
    }
  
    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) {
            // console.log(`Username for UID ${uid}: ${username}`); 
            setUser(username);
            submission.author = u_name;
            setSubmission({ ...submission, author: username })
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });
  
  
  
    //   const userid = auth.currentUser ? auth.currentUser.uid : '';
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   if (submission.trim() === '') return;
    //   sendSubmission(problem_id, approach, solution);
    //   // sendSubmission(problem_id, userid, approach, u_name, solution);
    //   setSubmission('');
    //   toast.success('Submitted successfully!');
    //   // setTimeout(() => {
    //   //   window.location.reload();
    //   // }, 2000);
    // };
  
  
    return ( 
      <div className='w-full'>
        <div className='flex justify-center items-center postbg py-8 w-full'>
          <div className=' bg-gray-800 px-10 py-10 rounded-xl postform'>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit Challenge Response</h2>
            </div>
            <div className=''>
              <textarea 
                value={submission.approach}
                onChange={(e) => setSubmission({ ...submission, approach: e.target.value })}
                name='title'
                className=' bg-gray-600 mb-4 px-2 py-2  inputbox rounded-lg
                 text-white placeholder:text-gray-200 outline-none'
                rows="8"
                placeholder='Add Challenge Approach'>
                </textarea> 
            </div>
            <div>
              <input 
              name='description'
                value={submission.language}
                onChange={(e) => setSubmission({ ...submission, language: e.target.value })}
                className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox  
                rounded-lg text-white placeholder:text-gray-200 outline-none'
                placeholder='Language..' />
            </div>
  
            <div className="mb-4">
              <label htmlFor="solution" className="block text-blue-200 font-semibold mb-2">
                Code:
              </label>
              <textarea
                id="solution"
                value={submission.solution} 
                onChange={(e) => setSubmission({ ...submission, solution: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter your code here"
                rows="8"
                required
              ></textarea>
            </div>
  
            <div className="text-center">
              <button
                type="submit"
                onClick={sendSubmission}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit Response
              </button>
            </div>
  
          </div>
        </div>
      </div>
    
    );
  }
  
  export default Submission;
  