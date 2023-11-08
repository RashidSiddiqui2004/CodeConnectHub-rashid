
import React from 'react'; 
import { Link } from 'react-router-dom';

function CreatePostPoster() {
 

    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-10">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">Share Your Knowledge</h2>
                <p className="text-xl text-white mb-6">
                    Contribute to our community, gain badges, and inspire others with your insights.
                </p>
                <Link  to={'/addproduct'}>
                    <button className="bg-green-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 hover:text-black">
                        Create a Post
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CreatePostPoster;
