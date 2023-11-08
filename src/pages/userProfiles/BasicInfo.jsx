
import React, { useContext, useEffect } from 'react';
import myContext from '../../context/data/myContext'
import { auth } from '../../firebase/FirebaseConfig';
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Profiler } from 'react';
import UserProfile from './UserProfile';

const BasicInfo = () => {

    const context = useContext(myContext);

    const { userProfile, getProfileData } = context;
    const { profiles, setProfiles } = context;

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
                const emailid = userDoc.data().email;
                return [username, emailid];
            } else {
                console.log('User not found.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        return null;

    }

    let userid;

    try {
        userid = auth.currentUser;
        try {
            userid = userid.uid;
        }
        catch {
            return;
        }
    } catch (err) {
        console.error("error", err);
    }


    setTimeout(async () => {
        await getProfileData(userid);
    }, 100);

    const about = "At Netaji Subhas University of Technology";


    // Existing FAQs
    const faqItems = [
        {
            question: 'How can I reset my password?',
            answer: 'To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions to reset your password.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept various payment methods, including credit cards, debit cards, and PayPal. You can choose your preferred payment option during the checkout process.'
        },
        // Add more general FAQs as needed
    ];

    // Additional FAQs for a tour and travel website
    const travelFAQs = [
        {
            question: 'How do I book a tour package?',
            answer: 'Booking a tour package is easy. Simply navigate to our Tours section, choose the destination you would like to visit, select the package that suits your preferences, and follow the booking instructions. You can also contact our customer support for assistance.'
        },
        {
            question: 'What destinations do you offer?',
            answer: 'We offer a wide range of destinations across the globe. From exotic beaches to adventurous mountains, you can explore various options on our website. Check our "Destinations" page for a complete list.'
        },
        {
            question: 'Are hotel facilities included in the tour packages?',
            answer: 'Yes, we provide hotel accommodations as part of our tour packages. We ensure comfortable and convenient stays at our partner hotels. You can find details about the hotels in the package description.'
        },
        {
            question: 'What modes of travel are available for tours?',
            answer: 'We offer various modes of travel, including air, train, and road transportation, depending on the destination and package. The transportation details are provided in the tour package description.'
        },
        {
            question: 'How can I contact your customer support?',
            answer: 'Our customer support team is available 24/7 to assist you. You can reach us via phone, email, or live chat. Visit the "Contact Us" page for detailed contact information.'
        },
    ];

    return (
        <div className="container mx-auto my-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4">
                    <div className="text-center mb-4">
                        <img
                            src="/user.jpg"
                            alt="User Profile"
                            className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300 mx-auto"
                        />
                        <h2 className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">
                            {profiles.fullname ? profiles.fullname : "Username"}
                        </h2>
                        <p className="text-gray-600">Age: {userProfile[0] ? userProfile[0].age : 20}</p>

                        <div className="my-2 rounded-lg bg-gray-500 w-fit mx-auto">
                            <h2 className="py-2 px-2 w-fit text-center text-white">
                                {userProfile[0] ? userProfile[0].badge : "Beginner"}
                            </h2>
                        </div>

                        <div className="my-2 rounded-lg w-fit mx-auto flex flex-row justify-center">
                            <div className="bg-gray-200 text-red-400 flex flex-col py-2 px-3 rounded-lg mx-3">
                                <h1>{userProfile[0] ? userProfile[0].followers : 0}</h1>
                                <h1>Followers</h1>
                            </div>
                            <div className="bg-gray-200 text-green-500 flex flex-col py-2 px-3 rounded-lg">
                                <h1>{userProfile[0] ? userProfile[0].followings : 0}</h1>
                                <h1>Following</h1>
                            </div>
                        </div>

                        <div className="w-fit text-center mx-auto rounded-xl bg-gray-400 text-yellow-100 shadow-md p-2">
                            <h3 className="text-sm font-semibold">About</h3>
                            <p className="text-md mt-3">{about}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 items-center rounded-lg text-white">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">User Statistics</h2>
                    </div>
                    <div className="text-center my-3">
                        <div className="border border-red-300 w-[130px] py-2 px-3 rounded-xl mx-auto my-3">
                            <p className="text-2xl font-semibold">49170</p>
                            <p className="text-lg">EXP gained</p>
                        </div>
                        <div className="border border-red-300 w-[150px] py-2 px-3 rounded-xl mx-auto my-3">
                            <p className="text-2xl font-semibold">7</p>
                            <p className="text-lg">Level (Expert)</p>
                        </div>
                        <div className="border border-red-300 w-[150px] py-2 px-3 rounded-xl mx-auto my-3">
                            <p className="text-2xl font-semibold">3</p>
                            <p className="text-lg">Posts</p>
                        </div>
                        <div className="border border-red-300 w-[150px] py-2 px-3 rounded-xl mx-auto my-3">
                            <p className="text-2xl font-semibold">3</p>
                            <p className="text-lg">Upvotes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BasicInfo; 