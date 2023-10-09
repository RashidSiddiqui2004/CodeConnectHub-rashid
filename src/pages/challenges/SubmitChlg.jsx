
import React, { useContext, useState } from 'react'
import myContext from '../../context/data/myContext' 
import { auth } from '../../fireabase/FirebaseConfig';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";  

function AddChallenge() {
    const context = useContext(myContext);
    const { challenges, setChallenges, addChallenge } = context; 

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
                console.log('Username:', username);

                return username;
            } else {
                console.log('User not found.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        return null;

    }

    let uid;

    try {
        uid = auth.currentUser.uid;
    } catch (err) {
        console.error("error", err);
    }

    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) {
            console.log(`Username for UID ${uid}: ${username}`);
            // posts
            setUser(username);
            challenges.author = u_name;
            setChallenges({ ...challenges, author: username })
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });

    return (
        <div>
            <div className='flex justify-center items-center postbg py-8'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl postform'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Create a Challenge for Community</h1>
                    </div>
                    <div className=''>
                        <input type="text"
                            value={challenges.title}
                            onChange={(e) => setChallenges({ ...challenges, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2  inputbox rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Challenge Title'
                        />
                    </div>
                    <div>
                        <textarea cols="40" rows="10" name='description'
                            value={challenges.problemStatement}
                            onChange={(e) => setChallenges({ ...challenges, problemStatement: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox  rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Problem Statement..'>

                        </textarea>
                    </div>

                    <div>
                        <input type="text"
                            value={challenges.tags}
                            onChange={(e) => setChallenges({ ...challenges, tags: e.target.value })}
                            name='tags'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Tags for clarity'
                        />
                    </div>

                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addChallenge}
                            className=' bg-yellow-500 w-full text-black font-bold inputbox px-2 py-2 rounded-lg'>
                            Post Challenge
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddChallenge