
import React, { useContext,useState } from 'react';
import myContext from '../../context/data/myContext' 
import { auth } from '../../firebase/FirebaseConfig';
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";

const InfoForm = () => {

    const context = useContext(myContext);
    const { profiles, setProfiles, asliUpdateProfile } = context; 

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

    const [name, setName] = useState(profiles.fullname);
    const [email, setEmail] = useState(profiles.email);
    const [phoneNum,setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [dob,setDOB] = useState("");

    const handleName = (e) => {
        setName(e.target.value) 
        setProfiles({ ...profiles, fullname: e.target.value }); 
    };

    const handleEMail = (e) => {
        setEmail(e.target.value) 
        setProfiles({ ...profiles, email: e.target.value }); 
    };

    const handleDob = (e) => {
        setDOB(e.target.value);
        setProfiles({ ...profiles, DOB: e.target.value }); 
    };

    const handleAge = (e) => {
        setDOB(e.target.value);
        setProfiles({ ...profiles, age: e.target.value }); 
    };

    const handlePhonenum = (e) => {
        setPhoneNum(e.target.value);
        setProfiles({ ...profiles, phoneNo: e.target.value }); 
    };

    const handleCountry = (e) => {
        setCountry(e.target.value);
        setProfiles({ ...profiles, country: e.target.value }); 
    };
 

    return (
        <div className="mt-8 text-center w-[600px] mx-[20%]">

            <h2 className=' text-gray-100 text-xl my-3'>Update Profile</h2>
            <form>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-300">Profile Image</label>
                    
                    {/* <input
                        type="file"
                        accept="image/*"
                        value={locations.imageUrl}
                        onChange={(e) => setProfiles({ ...locations, imageUrl: e.target.value })}
                        className="w-full py-2 px-2 rounded-lg border border-dashed
                         border-gray-400 focus:border-blue-500 text-white"
                    /> */}
             
                    <input type="text"
                            value={profiles.imageUrl}
                            onChange={(e) => setProfiles({ ...profiles, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add an Image Url'
                        />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-300">User Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profiles.fullname}
                        onChange = {handleName}
                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500"
                    /> 
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-300">Age</label>
                     
                    <input
                        type="number"
                        name="age"
                        value={Number.parseInt(profiles.age)}
                        placeholder='Enter your age..'
                        onChange = {handleAge}
                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500"
                    /> 
                </div>
                <div className="mb-4">
                <label className="block font-semibold text-gray-300">E-Mail ID</label>
                    <input
                        type="email"
                        name="email"
                        value={profiles.email}
                        onChange = {handleEMail}
                        className="w-full px-4 py-2 rounded-lg border focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                <label className="block font-semibold text-gray-300">Phone No.</label>
                    <input
                        type="number"
                        name="phone"
                        value={profiles.phone}
                        onChange = {handlePhonenum}
                        placeholder='Enter your Phone No..'
                        className="w-full px-4 py-2 rounded-lg border focus-border-blue-500"
                    />
                </div>
                <div className="mb-4">
                <label className="block font-semibold text-gray-300">Country</label>
                    <input
                        type="text"
                        name="address"
                        value={profiles.country}
                        onChange = {handleCountry}
                        className="w-full px-4 py-2 rounded-lg border focus-border-blue-500"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 
                        rounded-lg hover:bg-blue-600 transition-colors duration-300  w-[250px]"
                        onClick={asliUpdateProfile}
                    >
                        Update Information
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InfoForm;
