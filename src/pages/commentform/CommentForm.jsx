
import React, { useState, useContext } from 'react';
import myContext from '../../context/data/myContext';
import { auth } from '../../fireabase/FirebaseConfig';
import { getDoc, collection, query, where, getDocs} from "firebase/firestore";
import { fireDB } from '../../fireabase/FirebaseConfig';

const CommentForm = ({ post_id }) => {
  const [comment, setComment] = useState('');

  const context = useContext(myContext);
  const { writeComment } = context; 

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

  const uid = auth.currentUser.uid;

  const [u_name,setUser] = useState('');
 
  getUsernameByUID(uid).then((username) => {
    if (username) {
      // console.log(`Username for UID ${uid}: ${username}`);
      setUser(username);
    } else {
      console.log(`User with UID ${uid} not found.`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return; // Prevent empty comments
    writeComment(post_id, uid, comment, u_name); 
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;