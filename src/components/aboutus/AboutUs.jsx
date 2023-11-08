
import React from 'react';
import { FaUsers, FaLightbulb, FaCode, FaHeart } from 'react-icons/fa';
import "./styles.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

function AboutUsPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-4">About CodeConnectHub</h1>
            <div className="flex items-center space-x-4 mb-4">
                <FaUsers className="text-3xl text-blue-500" />
                <p className="text-lg text-gray-700">
                    Welcome to CodeConnectHub, a community-driven platform for developers, programmers, and tech enthusiasts. Our mission is to create a space where you can share your knowledge, learn from others, and connect with like-minded individuals.
                </p>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
                Our Vision
                <span className="ml-2 text-gray-400 text-lg animate-pulse">
                    <FaLightbulb />
                </span>
            </h2>
            <p className="text-gray-700">
                We believe in the power of collaboration, and our vision is to empower developers worldwide to learn, grow, and build together. Whether you're a seasoned pro or just starting your coding journey, CodeConnectHub is your home in the world of tech.
            </p>

            {/* <h2 className="text-2xl font-semibold mt-6 mb-2">
                Meet the Creator
                <span className="ml-2 text-gray-400 text-lg animate-bounce">
                    <FaCode />
                </span>
            </h2> */}

            <div className="mt-5 text-left">
                <h2 className="text-2xl font-semibold ">Meet the Developer</h2>
                <span className="ml-2 text-gray-400 text-lg animate-bounce">
                    <FaCode />
                </span>
                <p className="text-gray-600 text-lg">
                    As the brain behind this amazing platform, they've spent countless hours bringing their vision to life.
                </p>
                <p className="text-gray-600 text-lg">
                    When they're not coding, you can find them exploring the latest tech trends, sipping coffee, and occasionally attempting to break their own code.
                </p>
                <p className="text-gray-600 text-lg">
                    Connect with them to share your thoughts, feedback, and ideas. They love hearing from you!
                </p>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-2">
                Our Commitment
                <span className="ml-2 text-red-500 text-lg animate-ping custom-ping">
                    <FaHeart />
                </span>
            </h2>
            <p className="text-gray-700">
                We are committed to providing a platform that promotes learning, sharing, and connecting. Your hard work and creativity have brought this community to life.
            </p>

            <h3>You can connect with Rashid Siddiqui on various social media platforms</h3>

            <div className="mt-4 flex space-x-4 items-center mx-[40%]">
                <a href="https://github.com/RashidSiddiqui2004" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={32} className="text-gray-600 hover:text-gray-800" />
                </a>
                <a href="https://www.linkedin.com/in/rashid-siddiqui2004/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={32} className="text-blue-600 hover:text-blue-800" />
                </a>
        
                <a href="https://www.instagram.com/rashid_siddiqui2026/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={32} className="text-pink-600 hover:text-pink-800" />
                </a>
            </div>
        </div>
    );
}

export default AboutUsPage;
