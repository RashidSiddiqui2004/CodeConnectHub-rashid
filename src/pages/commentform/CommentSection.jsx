
import { useEffect } from 'react'; 
import {useContext } from 'react';
import myContext from '../../context/data/myContext';  

import Comment from './Comment';

function CommentSection({ postId }) {

  const context = useContext(myContext);
  const { getCommentsForPost ,comments} = context;

  useEffect(() => { 
    getCommentsForPost(postId);
  }, [postId]);

  return (
    <div className="my-6 w-[600px] mx-[25%]">
      <h2 className="text-2xl font-semibold text-blue-700 underline mb-4 text-center">COMMENT SECTION</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment comment={comment}/>
        ))}
      </div>
    </div> 
  );
}

export default CommentSection;

 