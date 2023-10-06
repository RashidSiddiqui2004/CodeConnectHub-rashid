
import React, { useState,useContext} from 'react';
import myContext from '../../context/data/myContext';
import { auth } from '../../fireabase/FirebaseConfig';

const CommentForm = ({ post_id }) => {
  const [comment, setComment] = useState('');

  const context = useContext(myContext);
  const {writeComment } = context;
  const user_id = auth.currentUser.uid;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return; // Prevent empty comments
    writeComment(post_id, user_id, comment);
    // console.log(comment);
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