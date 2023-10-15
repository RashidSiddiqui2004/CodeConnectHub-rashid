
import React from 'react';

const SignupCard = () => {

    const login = () => {
        window.location.href = '/login';
      }
      
  return (
    <div className="bg-blue-600 text-white rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-3">Welcome to CodeConnectHub</h2>
      <p className="text-lg mb-3">
        Join our coding community to explore posts, challenges, and more. Connect with fellow coders, share your knowledge, and grow your skills.
      </p>
      <button className="bg-yellow-400 text-blue-900 rounded-lg font-semibold px-4 py-2 hover:bg-yellow-500"
      onClick={login}>
        Sign Up / Log In
      </button>
    </div>
  );
}

export default SignupCard;
