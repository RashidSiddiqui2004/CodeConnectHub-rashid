

import Layout from '../../components/layout/Layout';
import BasicInfo from './BasicInfo'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext'
import { auth } from '../../firebase/FirebaseConfig';  
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import Preferences from './Preferences';
import InfoForm from './Infoform';


function UserProfile() {

    const context = useContext(myContext);

    const { profiles, setProfiles } = context;

    async function getUsernameByUID(uid) { 
        const usersCollection = collection(fireDB, 'users');
        const userQuery = query(usersCollection, where('uid', '==', uid));

        try {
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                // Retrieve the first (and hopefully only) document
                const userDoc = querySnapshot.docs[0]; 
                const username = userDoc.data().name; 
                const emailid = userDoc.data().email; 
                return [username,emailid];
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
        profiles.userid = uid;
    } catch (err) {
        console.error("error", err);
    }

    const [u_name, setUserdetails] = useState('');

    getUsernameByUID(uid).then((details) => {
        if (details) { 
            setUserdetails(details[0]);
            profiles.fullname = u_name;
            profiles.email = details[1];  
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });

    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [userinfo, setUserinfo] = useState(true);

    const menuItems = [
        { label: 'My Profile', icon: faUser, component: <BasicInfo /> },
        { label: 'Update Profile', icon: faUser, component: <InfoForm /> },
        // { label: 'Preferences', icon: faIdCard, component: <Preferences/> },  
    ];

    const handleMenuItemClick = (index) => {
        setSelectedMenuItem(index);
        setUserinfo(false);
    }; 

    const logout = () => {
        localStorage.clear('user');
        window.location.href = '/login';
    }
 
    return (
        <Layout>
            <div className='flex flex-row my-4 py-8 bg-slate-800 w-full'>
                {/* chhota card-> user image + name */}
                <div>
                    <div className='flex flex-row bg-slate-400 px-3 py-4 mx-[50px] w-[280px] rounded-md'>
                        <div>
                            <img
                                src={profiles.imageUrl ? profiles.imageUrl : "/user.jpg"}
                                alt="User Profile"
                                className="w-4 h-4 md:w-10 md:h-10 lg:w-15 lg:h-15 rounded-full object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className='mx-8'>
                            <h2>Hello, </h2>
                            <h2>{profiles.fullname ? profiles.fullname: 'User'}</h2>
                        </div>
                    </div>

                    <div className='flex flex-col my-5 mx-[30px]'>
                        <button className='py-4 mx-4 w-[300px] border-white bg-slate-900 text-white rounded-md'>My Orders</button>
                        <hr className='w-[300px] text-center align-middle mx-[15px]' />
                        <h2 className='py-4 mx-4 bg-slate-900 w-[300px] text-white text-center underline'>Account Settings</h2>

                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`py-4 mx-4 bg-slate-900 w-[300px] text-white hover:text-red-400 hover:scale-[102%] ${selectedMenuItem === index ? 'active' : ''}`}
                                onClick={() => handleMenuItemClick(index)}
                            >
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                {item.label}
                            </button>
                        ))}


                        {uid ? <a onClick={logout} >
                            <button className='py-4 w-[300px] bg-slate-900 text-white rounded-xl mx-4 my-5'>
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Logout
                            </button>
                        </a>
                            : ""}

                    </div>
                </div>

                <div>
                    {userinfo ? <BasicInfo /> : null}
                    {selectedMenuItem !== null ? menuItems[selectedMenuItem].component : null}
                </div>
            </div>
        </Layout>
    );
}

export default UserProfile;
