import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
     onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';
// import { auth } from '../../fireabase/FirebaseConfig';
import { where } from 'firebase/firestore';

function myState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState({
        title: "",
        description: "",
        author: null,
        language: "",
        code: null,
        imageUrl: null,
        tags: null,
        likes: 0,
        dislikes: 0,
        time: Timestamp.now(),
        comments: [],
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addPost = async () => {

        console.log(posts);
        if (posts.title == null || posts.tags == null || posts.description == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'posts');
            // posts.author = auth.currentUser.name;
            await addDoc(productRef, posts)
            toast.success("Added post successfully");
            setTimeout(() => {
                window.location.href = '/'
            }, 800);
            getPostData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        } 
    }

    const [post, setPost] = useState([]);

    const getPostData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'posts'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let postArray = [];
                QuerySnapshot.forEach((doc) => {
                    postArray.push({ ...doc.data(), id: doc.id });
                });
                setPost(postArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getPostData();
    }, []);

    // update product function

    const edithandle = (item) => {
        setPosts(item)
    }

    const updatePost = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'posts', posts.id), posts)
            toast.success("Post Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getPostData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete product

    const deletePost = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'posts', item.id))
            toast.success('Post Deleted successfully')
            getPostData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [mail, setEmail] = useState("");

    const getUserEmail = async (authorID) => {
        // console.log(authorID);

        const usersCollection = collection(fireDB, 'users');

        const userQuery = query(usersCollection, where('uid', '==', authorID));
  
        getDocs(userQuery)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) { 
                    const userDocument = querySnapshot.docs[0].data();
                    let userEmail = userDocument.email; 
                    setEmail(userEmail);
                    // console.log(userEmail);
                    return userEmail;
                } else {
                    console.log('No user found with the specified UID.');
                }
            })
            .catch((error) => {
                console.error('Error retrieving user email:', error);
            });
 
    }

    async function getCommentsForPost(postId) {
        const commentsRef = collection(fireDB, 'comments'); // Reference to the comments collection
    
        // Create a query to filter comments by postId
        const commentsQuery = query(commentsRef, where('post_id', '==', postId));
        
        // Execute the query and get the documents
        const querySnapshot = await getDocs(commentsQuery);
        
        // Extract the comment data from the query snapshot
        const comments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        return comments;
    }

    async function writeComment(post_id, user_id, comment, username) {
        const commentsRef = collection(fireDB, 'comments'); // Reference to the comments collection
        
        // Create a new comment document
        const newComment = {
            post_id,
            user_id,
            comment,
            username,
            timestamp: new Date(), // You can include a timestamp for sorting
        };
        
        // Add the comment to the collection
        await setDoc(doc(commentsRef), newComment);
    }

    // challenges

    const [challenges, setChallenges] = useState({
        title: null,
        problemStatement: null,
        author: null,   
        tags: null,
        submissions: 0,
        time: Timestamp.now()
    });

    const addChallenge = async () => {

        if (challenges.title == null) {
            return toast.error("Title is required..")
        }

        if( challenges.problemStatement == null){
            return toast.error("Challenge is required..");
        }

        setLoading(true)

        try {
            const challengeRef = collection(fireDB, 'challenges'); 
            await addDoc(challengeRef, challenges)
            toast.success("Added Challenge Successfully");
            setTimeout(() => {
                window.location.href = '/challenges'
            }, 800);
            getChallengeData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        } 
    }

    const [challenge, setChallenge] = useState([]);

    const getChallengeData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'challenges'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let chlgArray = [];
                QuerySnapshot.forEach((doc) => {
                    chlgArray.push({ ...doc.data(), id: doc.id });
                });
                setChallenge(chlgArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getChallengeData();
    }, []);


    // orders -> remove

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            // console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            // console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            posts, setPosts, addPost, post,
            edithandle, updatePost, deletePost, order,
            user, searchkey, setSearchkey, filterType, setFilterType,
            filterPrice, setFilterPrice, writeComment, getCommentsForPost, getUserEmail, mail,
            challenges, setChallenges, addChallenge, challenge, setChallenge
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState