
import React from 'react'; 
import { Link } from 'react-router-dom';

const ChallengesPoster = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-10">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">Challenges Await!</h2>
        <p className="text-xl text-white mb-6">
          Get ready to showcase your skills and solve exciting challenges.
        </p>
        <Link to={'/challenges'}>
          <button className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600">
            View Challenges
          </button>
        </Link>

      </div>
    </div>
  )
}

export default ChallengesPoster