
import React, { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard'; // Create a component for each challenge card
import { fetchChallenges } from './api'; // Implement a function to fetch challenges from the backend
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Navbar from '../../components/navbar/Navbar';

const Challenges = () => {

    const context = useContext(myContext);
    const { challenge } = context;

    const addChl = () => {
        window.location.href = '/submitChallenge';
    };


    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1); // Track the current page of challenges
    const [hasMore, setHasMore] = useState(true); // Track if there are more challenges to load
    const perPage = 10; // Number of challenges to load per page

    // Fetch challenges and update the state
    const loadChallenges = async (page) => {
        try {
            const newChallenges = await fetchChallenges(page, perPage); // Use your API function to fetch challenges
            setChallenges((prevChallenges) => [...prevChallenges, ...newChallenges]);
            if (newChallenges.length === 0) {
                setHasMore(false); // No more challenges to load
            }
        } catch (error) {
            console.error('Error loading challenges:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load more challenges when the user scrolls to the bottom
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (!isLoading && hasMore) {
                setIsLoading(true);
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        loadChallenges(page);
    }, [page]); // Load challenges when the page changes

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, hasMore]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-900 text-white py-10">

                <header className="py-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
                        Welcome to ChallengeHub
                    </h1>
                    <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
                        Explore exciting challenges and showcase your skills!
                    </p>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-full animate__animated animate__bounce animate__delay-3s">
                        Get Started
                    </button>
                </header>

                <div className="mx-auto w-full max-w-md py-4">
                    <button
                        onClick={addChl}
                        className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 mx-[135px] rounded-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
                    >
                        <span>Add Challenge</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                    </button>
                </div>
                
                <div className="challenges-grid">
                    {challenges.map((challenge) => (
                        <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                    {isLoading && <div className="loading-message">Loading...</div>}
                    {!isLoading && !hasMore && challenges.length === 0 && (
                        <div className="no-challenges-message">No challenges available.</div>
                    )}
                </div>
            </div>
        </>

    );
};

export default Challenges;
