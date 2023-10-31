
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { fireDB } from '../../fireabase/FirebaseConfig';
import myContext from '../../context/data/myContext';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth } from '../../fireabase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";

const CommentReply = () => {

    // use params.id
    const params = useParams();

    const commentId = params.id;

    const context = useContext(myContext);
    const { getReplies, replies, submitReply } = context;

    useEffect(() => {
        getReplies(commentId);
    }, []);


    const [replyText, setReplyText] = useState('');

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    async function getUsernameByUID(uid) {
        const usersCollection = collection(fireDB, 'users');

        // Create a query to find the user with the specified UID
        const userQuery = query(usersCollection, where('uid', '==', uid));

        try {
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
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

    const user = JSON.parse(localStorage.getItem('user')).user.uid;

    const [u_name, setUser] = useState('');

    getUsernameByUID(user).then((username) => {
        if (username) {
            setUser(username);
        }
    });

    const handleReplySubmit = () => {
        submitReply(commentId, user, u_name, replyText);
        setReplyText('');
        getReplies(commentId);
        console.log(replies);
    };

    function formatTimestamp(timestamp) {
        const now = new Date();
        const replyTime = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date

        const timeDifference = now - replyTime;
        const secondsDifference = Math.floor(timeDifference / 1000); // Convert to seconds

        if (secondsDifference < 60) {
            return `${secondsDifference} seconds ago`;
        } else if (secondsDifference < 3600) {
            const minutes = Math.floor(secondsDifference / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (secondsDifference < 86400) {
            const hours = Math.floor(secondsDifference / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(secondsDifference / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }

    let reversedArray;
    
    if(replies && replies.replies){
        reversedArray = replies.replies.slice().reverse();
    }
    
    return (

        <div className='w-[1000px] items-center mx-[230px]'>

            <div className="p-4">

                <div className="flex items-center">
                    <img
                        src="/user.jpg"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    <span className="font-semibold text-gray-500">{replies.username}</span>

                </div>
                <p className="text-white mt-2 bg-slate-400 px-2 py-2 rounded-md">{replies.comment}</p>

                <div className='flex flex-row'>

                    <span className='bg-red-200 rounded-md mx-2 my-2 px-2 py-1'>{replies.hasOwnProperty('likes') ? replies.likes : 0} Likes</span>

                </div>

                {/* Reply input field */}
                <div className="mb-4">
                    <textarea
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={handleReplyChange}
                    ></textarea>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    onClick={handleReplySubmit}
                >
                    Reply
                </button>
            </div>

            <div className=' bg-white  text-blue-500'>
                
                {/* {replies && replies.replies && replies.replies.map((reply) => */} 
                {replies && replies.replies && reversedArray.map((reply) =>
       
                (

                    <div
                        key={reply.timestamp}
                        className=" bg-gray-700 py-2 my-2 mx-4 p-4 shadow-md rounded-lg"
                    >
                        <div className="items-center mb-2">
                            {/* <img
                    src={reply.userAvatar}
                    alt={reply.username}
                    className="h-8 w-8 rounded-full mr-2"
                  /> */}
                            <div className='flex flex-row'>
                                <p className="text-white font-semibold">{reply.username} </p>
                                <p className='text-white mx-2'> (He/His)</p>

                                <p className="text-red-200 text-sm mt-2 absolute right-[270px]">
                                    {formatTimestamp(reply.timestamp)}
                                </p>
                            </div>

                            <p className='text-green-300 text-sm'>ML Engineer at iNeuron</p>

                        </div>
                        <p className="text-gray-200">{reply.reply}</p>
                        {/* <p className="text-blue-300 text-sm mt-2">
                            {new Date(reply.timestamp.toDate()).toLocaleString()}
                        </p> */}
                    </div>
                ))}

            </div>

        </div>
    )
}

export default CommentReply