import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../firebase/FirebaseConfig';
import { FaComment, FaBookmark } from "react-icons/fa";
import CommentForm from '../commentform/CommentForm';
import { auth } from '../../firebase/FirebaseConfig';
import CommentSection from '../commentform/CommentSection';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function ProductInfo() {
  const context = useContext(myContext);
  const { setLoading, getCommentsForPost, getUserEmail, mode, deletePost, user } = context;

  const [poststate, setPosts] = useState('');
  const params = useParams();

  const getPostData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "posts", params.id));
      setPosts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostData();
  }, []);

  const userID = JSON.parse(localStorage.getItem('user')).user.uid;

  async function likePost() {
    try {
      let userId;
      let postId;

      if (auth.currentUser == null) {
        toast.dark('Please log in/sign up to like posts.');
        return;
      }
      try {
        userId = auth.currentUser.uid;
        postId = params.id;

        const likeRef = doc(fireDB, 'likes', `${userId}_${postId}`);
        const likeDoc = await getDoc(likeRef);

        if (likeDoc.exists()) {
          // The user has already liked the post, so "unlike" it
          const updatedVotes = poststate.likes - 1; // Decrement the likes
          const updatedPost = {
            ...poststate,
            likes: updatedVotes,
          };

          setPosts(updatedPost);
          toast.dark('Post Downvoted 👎');
          await deleteDoc(likeRef);
        } else {
          // The user hasn't liked the post yet, so "like" it
          const updatedVotes = poststate.likes + 1; // Increment the likes
          const updatedPost = {
            ...poststate,
            likes: updatedVotes,
          };

          // Update the post in the database
          await setDoc(doc(fireDB, 'posts', params.id), updatedPost);
          setPosts(updatedPost);
          toast.success('Post Upvoted 👍');
          await setDoc(likeRef, { userId, postId });
        }
      } catch (error) {
        console.error('Error while liking a post:', error);
      }
    } catch (error) {
      toast.dark('Please log in/sign up to like posts.');
      return;
    }

  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const cmts = await getCommentsForPost(params.id);
      setComments(cmts);
    }

  }, []);

  const { post } = context;


  const remainingPosts = post.filter(individualPost => individualPost.id !== params.id);

  const numberOfPostsToSelect = 3;

  const selectedPosts = remainingPosts.slice(0, numberOfPostsToSelect);

  // relevant posts -> tags, title, ML Model, likes-> top posts

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 flex mx-5">

          <div className="w-[70%] p-1">
            {poststate && (
              // <div className="lg:w-4/5 mx-auto flex flex-wrap flex-col items-center justify-center sm:flex-row">
              <div className="sm:flex-row items-center text-center flex flex-wrap flex-col justify-center">
                <img
                  alt="postImage"
                  className="w-full md:w-2/3 lg:w-2/3 h-auto max-h-[400px] object-cover object-center rounded"
                  src={poststate.imageUrl}
                />

                <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font bg-blue-100 w-fit mx-[35%] px-3 rounded-md
                 text-red-400 text-center py-1 tracking-widest">
                    Author: {poststate.author ? poststate.author : "Rashid"}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {poststate.title}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <span className="text-gray-600 ml-2">
                        {poststate.likes ? poststate.likes : 0} Upvotes
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
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
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
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
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
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                      </a>
                    </span>

                    {(poststate?.authorId && poststate.authorId == userID) ?
                      <div className="mx-[300px] flex gap-2">
                        <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                          <div onClick={() => deletePost(poststate)}  >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </div>

                          <Link to={'/updateproduct'}>
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div> : ""}
                  </div>


                  <p className="leading-relaxed border-b-2 mb-5 pb-5">
                    {poststate.description}
                  </p>
                  <p className="leading-relaxed border-b-2 mb-5 pb-5 text-red-500">
                    {poststate.language}
                  </p>
                  <p className="leading-relaxed border-b-2 mb-5 pb-5">
                    {poststate.code}
                  </p>
                  <div className="flex">
                    <button
                      onClick={() => likePost()}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Upvote Now
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
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-row items-center my-10 w-full">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-l-lg focus:outline-none w-1/2">
                      Start a Thread
                    </button>
                    <div className="bg-indigo-500 text-white py-2 px-4 rounded-r-lg w-1/2 flex items-center justify-center">
                      <FaComment className="text-2xl" />
                    </div>
                  </div>

                  {user ? <CommentForm post_id={params.id} /> : ""}

                </div>
              </div>
            )}

            <CommentSection postId={params.id} />
          </div>

          {/* Related posts */}
          <div className="w-[30%] p-2">
            <div className="bg-white rounded-lg p-4 text-center items-center shadow-md">
              <h1 className="text-xl font-semibold mb-4">Related Posts</h1>

              {selectedPosts.map((item, index) => {
                const { title, tags, description, imageUrl, id } = item;
                const tagList = tags.split(", ");
                return (
                  <div key={index} className="p-4 drop-shadow-lg" >
                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                      <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer" >
                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-105 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                      </div>
                      <div className="p-5 border-t-2">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>

                        <p className="leading-relaxed mb-3">{description.slice(0, 40)}...</p>


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

                        <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer" >

                          <button className="bg-white py-2 px-4 rounded-2xl
                                                 border border-gray-300 shadow-md flex items-center space-x-2 
                                                 hover:shadow-lg transition-transform transform hover:scale-105 border-x-fuchsia-200 text-rose-400">
                            <FaArrowRight />
                            Continue Reading
                          </button>
                        </div>


                      </div>

                    </div>
                  </div>
                )
              })}

            </div>
          </div>

        </div>


      </section>
    </Layout>
  );
}


export default ProductInfo