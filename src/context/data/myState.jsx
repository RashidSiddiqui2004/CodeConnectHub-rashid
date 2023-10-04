import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

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
        title: null,
        description: null,
        language: null,
        code:null,
        imageUrl: null,
        tags: null, 
        likes: 0,
        dislikes: 0,
        time: Timestamp.now(),
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
        if (posts.title == null || posts.imageUrl == null || posts.tags == null || posts.description == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'posts');
            await addDoc(productRef, posts)
            toast.success("Added post successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getPostData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        // setProducts("")
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

    // const incrementVotes = async () => {
    //     setLoading(true);
    //     try {
    //       // Increment the votes count before updating the post
    //       console.log("upvoting...");
    //       const updatedVotes = posts.likes + 1; // Increase by 1, you can adjust this value as needed
    //       console.log(updatedVotes);
      
    //       // Update the votes count in the posts object
    //       const updatedPost = {
    //         ...posts,
    //         likes: updatedVotes,
    //       };
      
    //       // Update the post in Firestore with the updated votes count
    //       await setDoc(doc(fireDB, 'posts', posts.id), updatedPost);
      
    //       toast.success("Post Updated successfully");
      
    //     //   setTimeout(() => {
    //     //     window.location.href = '/dashboard';
    //     //   }, 800);
      
    //       // Refresh the post data
    //     //   getPostData();
    //       setLoading(false);
    //     } catch (error) {
    //       console.log(error);
    //       setLoading(false);
    //     }
    //   };


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
            console.log(ordersArray)
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
            console.log(usersArray)
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
            user, searchkey, setSearchkey,filterType,setFilterType,
            filterPrice,setFilterPrice
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState