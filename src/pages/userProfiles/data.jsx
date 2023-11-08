
import React from 'react'

const data = () => {
  return (
    <div className="container mx-auto my-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                    <div className="text-center mb-4">
                        <img
                            src="/user.jpg"
                            alt="User Profile"
                            className="w-25 h-25 md:w-48 md:h-48 lg:w-40 lg:h-40
                             rounded-full object-cover shadow-lg hover:scale-105
                              transition-transform duration-300 mx-[150px]"
                        />
                        <h2 className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold">{profiles.fullname ? profiles.fullname : "Username"}</h2>
                        <p className="text-gray-600">Age: {userProfile[0] ? userProfile[0].age : 20}</p>

                        <div className='my-2 rounded-lg bg-gray-500 w-fit mx-[42%]'>
                            <h2 className='py-2 px-2 w-fit text-center  text-white'>{UserProfile[0] ? userProfile[0].badge : "Beginner"}</h2>
                        </div>

                        <div className='my-2 rounded-lg w-fit mx-[25%] flex flex-row justify-center'>
                            <div className='bg-gray-200 text-red-400 flex flex-col py-2 px-3 rounded-lg mx-3'>
                                <h1> {userProfile[0] ? userProfile[0].followers : 0}</h1>
                                <h1>Followers</h1>
                            </div>
                            <div className='bg-gray-200 text-green-500 flex flex-col py-2 px-3 rounded-lg'>
                                <h1>{userProfile[0] ? userProfile[0].followings : 0}</h1>
                                <h1>Following</h1>
                            </div>
                        </div>

                        <div className="w-fit text-center mx-[20%] rounded-xl
                         bg-gray-400 text-yellow-100 shadow-md p-2">
                            <h3 className="text-sm font-semibold">About</h3>
                            <p className="text-md mt-3">{about}</p>
                        </div>


                    </div>
                </div>

                <div className="p-5 items-center rounded-lg text-white">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">User Statistics</h2>
                    </div>
                    {/* <div className="flex justify-around mt-6"> */}
                        <div className="text-center border border-red-300 w-[130px] py-2 px-3
                        rounded-xl mx-[40%] my-3">
                            <p className="text-2xl font-semibold">49170</p>
                            <p className="text-lg">EXP gained</p>
                        </div>
                        <div className="text-center border border-red-300 w-[150px] py-2 px-3
                        rounded-xl mx-[38%] my-3">
                            <p className="text-2xl font-semibold">7</p>
                            <p className="text-lg">Level (Expert)</p>
                        </div>
                        <div className="text-center border border-red-300 w-[150px] py-2 px-3
                        rounded-xl mx-[38%]  my-3">
                            <p className="text-2xl font-semibold">3</p>
                            <p className="text-lg">Posts</p>
                        </div>
                        <div className="text-center border border-red-300 w-[150px] py-2 px-3
                        rounded-xl mx-[38%] my-3">
                            <p className="text-2xl font-semibold">3</p>
                            <p className="text-lg">Upvotes</p>
                        </div>
                    {/* </div> */}
                </div>


                {/* <div className="text-center mt-8">
                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-blue-600">Data Analytics</h2>
                        <ul className="list-inside list-disc text-blue-600">
                            <li className="mb-2">
                                <strong>Phone Number:</strong>  {userProfile[0] ? userProfile[0].phoneNo : "Phone Number"}
                            </li>
                            <li className="mb-2">
                                <strong>Email:</strong>  {userProfile[0] ? userProfile[0].email : "E-Mail"}
                            </li>
                        </ul>
                    </div>
                </div> */}

            </div>


            {/* 
            <div className="bg-white rounded-lg p-4 mt-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
                <ul className="list-inside list-disc text-blue-600">
                    {faqItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <strong className="text-black">{item.question}</strong>
                            <p className="text-gray-700">{item.answer}</p>
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mt-4">Travel and Booking FAQs</h3>
                <ul className="list-inside list-disc text-blue-600">
                    {travelFAQs.map((item, index) => (
                        <li key={index} className="mb-2">
                            <strong className="text-black">{item.question}</strong>
                            <p className="text-gray-700">{item.answer}</p>
                        </li>
                    ))}
                </ul>
            </div> */}

        </div>
  )
}

export default data