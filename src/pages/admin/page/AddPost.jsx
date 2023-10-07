

import React, { useContext, useState } from 'react'
import myContext from '../../../context/data/myContext' 
import { auth } from '../../../fireabase/FirebaseConfig';
import { fireDB } from '../../../fireabase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import MonacoEditor from "react-monaco-editor";
import "./styles.css"

function AddPost() {
    const context = useContext(myContext);
    const { posts, setPosts, addPost } = context;
    const [language, setLanguage] = useState("javascript");
    const [title, settitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleCodeChange = (newCode) => {
        setPosts({ ...posts, code: newCode }); 
    };

    const handleTitle = (e) => {
        settitle(e.target.value)
        console.log(e.target.value);
        setPosts({ ...posts, title: e.target.value }); 
    };

    const handleDesc = (e) => {
        setDesc(e.target.value);
        setPosts({ ...posts, description: e.target.value }); 
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        setPosts({ ...posts, language: e.target.value })
    };

    // to get the username
    async function getUsernameByUID(uid) {
        // Reference to the "users" collection
        const usersCollection = collection(fireDB, 'users');
 
        const userQuery = query(usersCollection, where('uid', '==', uid));

        try {
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                // Retrieve the first (and hopefully only) document
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

    let uid;

    try {
        uid = auth.currentUser.uid;
    } catch (err) {
        console.error("error", err);
    }


    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) { 
            setUser(username);
            posts.author = u_name;
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });

    return (
        <div>
            <div className='flex justify-center items-center postbg py-8'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl postform'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add a Post</h1>
                    </div>
                    <div className=''>
                         
                         <input type="text"
                            value={posts.title}
                            onChange={handleTitle}
                            // onChange={(e) => setPosts({ ...posts, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2  inputbox rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Post Title'
                        />
                    </div>
                    <div> 

                        <textarea cols="40" rows="10" name='description'
                            value={posts.description}
                            onChange={handleDesc}
                            // onChange={(e) => setPosts({ ...posts, description: e.target.value })} 
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox  rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='POST description..'>
                        </textarea>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 text-white">Code Editor</h2>

                    <div className="mb-4">
                        <label htmlFor="language" className="block font-semibold mb-2 text-white">
                            Select Language:
                        </label>
                        <select
                            id="language"
                            value={posts.language}
                            onChange={handleLanguageChange}
                            // onChange={(e) => setPosts({ ...posts, language: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="kotlin">Kotlin</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="code" className="block font-semibold mb-2 text-white">
                            Code:
                        </label> 

                        <MonacoEditor
                            height="300"
                            language={language}
                            theme="vs-light"
                            value={posts.code} 
                            onChange={handleCodeChange} // Use the updated 'handleCodeChange' function
                            options={{
                                wordWrap: "on",
                            }}
                        />

                    </div>

                    <div>
                        <input type="text"
                            value={posts.imageUrl}
                            onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add an Image Url'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={posts.tags}
                            onChange={(e) => setPosts({ ...posts, tags: e.target.value })}
                            name='tags'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Tags'
                        />
                    </div>

                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addPost}
                            className=' bg-yellow-500 w-full text-black font-bold inputbox px-2 py-2 rounded-lg'>
                            Post
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddPost


// import React, { useContext, useState } from 'react'
// import myContext from '../../../context/data/myContext' 
// import { auth } from '../../../fireabase/FirebaseConfig';
// import { fireDB } from '../../../fireabase/FirebaseConfig';
// import { collection, query, where, getDocs } from "firebase/firestore";
// import MonacoEditor from "react-monaco-editor";
// import "./styles.css"

// function AddPost() {
//     const context = useContext(myContext);
//     const { posts, setPosts, addPost } = context;
//     const [language, setLanguage] = useState("javascript");

//     const handleCodeChange = (newCode) => {
//         setPosts({ ...posts, code: newCode });
//         // setCode(newCode.target.value);
//     };


//     const handleLanguageChange = (e) => {
//         setLanguage(e.target.value);
//     };

//     // to get the username
//     async function getUsernameByUID(uid) {
//         // Reference to the "users" collection
//         const usersCollection = collection(fireDB, 'users');

//         // Create a query to find the user with the specified UID
//         const userQuery = query(usersCollection, where('uid', '==', uid));

//         try {
//             const querySnapshot = await getDocs(userQuery);

//             if (!querySnapshot.empty) {
//                 // Retrieve the first (and hopefully only) document
//                 const userDoc = querySnapshot.docs[0];
//                 // Extract the username (name) field
//                 const username = userDoc.data().name;
//                 console.log('Username:', username);

//                 return username;
//             } else {
//                 console.log('User not found.');
//             }
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }

//         return null;

//     }

//     // useEffect(() => {
//     //     const fetchUsername = async () => {
//     //         try {
//     //             const user = auth.currentUser;
//     //             if (user) {
//     //                 const username = await getUsernameByUID(user.uid);
//     //                 if (username) {
//     //                     setUser(username);
//     //                     setPosts({ ...posts, author: username });
//     //                 } else {
//     //                     console.log('User not found.');
//     //                 }
//     //             } else {
//     //                 console.log('User is not logged in.');
//     //             }
//     //         } catch (error) {
//     //             console.error('Error fetching user:', error);
//     //         }
//     //     };

//     //     fetchUsername();
//     // }, []);

//     let uid;

//     try {
//         uid = auth.currentUser.uid;
//     } catch (err) {
//         console.error("error", err);
//     }


//     const [u_name, setUser] = useState('');

//     getUsernameByUID(uid).then((username) => {
//         if (username) {
//             console.log(`Username for UID ${uid}: ${username}`);
//             posts
//             setUser(username);
//             posts.author = u_name;
//         } else {
//             console.log(`User with UID ${uid} not found.`);
//         }
//     });

//     return (
//         <div>
//             <div className='flex justify-center items-center postbg py-8'>
//                 <div className=' bg-gray-800 px-10 py-10 rounded-xl postform'>
//                     <div>
//                         <h1 className='text-center text-white text-xl mb-4 font-bold'>Add a Post</h1>
//                     </div>
//                     <div className=''>
//                         <input type="text"
//                             value={posts.title}
//                             onChange={(e) => setPosts({ ...posts, title: e.target.value })}
//                             name='title'
//                             className=' bg-gray-600 mb-4 px-2 py-2  inputbox rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Add Post Title'
//                         />
//                     </div>
//                     <div>
//                         <textarea cols="40" rows="10" name='description'
//                             value={posts.description}
//                             onChange={(e) => setPosts({ ...posts, description: e.target.value })}
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox  rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='POST description..'>

//                         </textarea>
//                     </div>

//                     <h2 className="text-2xl font-semibold mb-4 text-white">Code Editor</h2>

//                     <div className="mb-4">
//                         <label htmlFor="language" className="block font-semibold mb-2 text-white">
//                             Select Language:
//                         </label>
//                         <select
//                             id="language"
//                             value={posts.language}
//                             onChange={handleLanguageChange}
//                             // onChange={(e) => setPosts({ ...posts, language: e.target.value })}
//                             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
//                         >
//                             <option value="javascript">JavaScript</option>
//                             <option value="python">Python</option>
//                             <option value="html">HTML</option>
//                             <option value="css">CSS</option>
//                             <option value="c">C</option>
//                             <option value="cpp">C++</option>
//                             <option value="kotlin">Kotlin</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="code" className="block font-semibold mb-2 text-white">
//                             Code:
//                         </label> 

//                         <MonacoEditor
//                             height="300"
//                             language={language}
//                             theme="vs-light"
//                             value={posts.code} 
//                             onChange={handleCodeChange} // Use the updated 'handleCodeChange' function
//                             options={{
//                                 wordWrap: "on",
//                             }}
//                         />

//                     </div>

//                     <div>
//                         <input type="text"
//                             value={posts.imageUrl}
//                             onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
//                             name='imageurl'
//                             className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Add an Image Url'
//                         />
//                     </div>
//                     <div>
//                         <input type="text"
//                             value={posts.tags}
//                             onChange={(e) => setPosts({ ...posts, tags: e.target.value })}
//                             name='tags'
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Add Tags'
//                         />
//                     </div>

//                     <div className=' flex justify-center mb-3'>
//                         <button
//                             onClick={addPost}
//                             className=' bg-yellow-500 w-full text-black font-bold inputbox px-2 py-2 rounded-lg'>
//                             Post
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddPost