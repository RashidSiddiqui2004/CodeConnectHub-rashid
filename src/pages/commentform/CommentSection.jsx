
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';// Replace with your Firebase configuration

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => { 
    async function fetchComments() {
      const commentsRef = collection(fireDB, 'comments'); // Assuming your collection is named 'comments'
      const commentsQuery = query(commentsRef, where('post_id', '==', postId));

      try {
        const querySnapshot = await getDocs(commentsQuery);

        const commentData = [];
        querySnapshot.forEach((doc) => {
          commentData.push({ id: doc.id, ...doc.data() });
        });

        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [postId]);

  return (
    <div className="my-6 w-[600px] mx-[25%]">
      <h2 className="text-2xl font-semibold text-blue-700 underline mb-4">COMMENT SECTION</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <img
              src="/user.jpg"
                // src={comment.userAvatar} // Replace with the user's avatar URL
                // alt={comment.userName}
                className="w-10 h-10 rounded-full object-cover mr-2"
              />
              {/* <span className="font-semibold text-gray-700">UserRandom</span> */}
              <span className="font-semibold text-gray-700">{comment.username}</span>
            </div>
            <p className="text-gray-800 mt-2">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div> 
  );
}

export default CommentSection;
