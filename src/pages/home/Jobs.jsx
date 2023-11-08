
import React from 'react'

const Jobs = () => {
    return (
        <>
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-12 flex flex-row items-center justify-center">
                <div className="w-1/2 px-10">
                    {/* Typography */}
                    <button className="text-xl bg-blue-200 text-green-800 border rounded-full px-3 py-2 mb-4">Why Join Us?</button>

                    <h2 className="text-4xl text-white font-semibold mb-2">Great students deserve great platforms.</h2>

                    <p className="text-2xl text-white leading-7 mb-8">
                        CodeConnectHub is the right place for you. Join our coding community and explore a world of opportunities. Learn, collaborate, and grow with us.
                    </p>

                    <div className="flex items-center space-x-8">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 4V10h6" />
                            </svg>
                            <p className="text-white text-lg">Quality Content</p>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 10l6 6l6-6M9 5v10" />
                            </svg>
                            <p className="text-white text-lg">Challenges & Contests</p>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 relative flex items-center justify-center">
                    <img src="/happyPeople.jpg" className="w-80 h-auto rounded-lg" alt="Happy People" />
                </div>
            </div>

        </>
    )
}

export default Jobs