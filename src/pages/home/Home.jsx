import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import PostCard from '../../components/postCard/PostCard'
import Track from '../../components/track/Track'
import { Link } from 'react-router-dom'

function Home() {

  const context = useContext(myContext)
  const { mode } = context

  const add = () => {
    window.location.href = '/addproduct';
  }

  return (
    <Layout>
      <HeroSection /> 

      <div className="w-96 mx-auto my-20">
        <button
          onClick={add}
          type="button"
          className={`focus:outline-none ${mode === 'dark'
              ? 'bg-gray-800 text-white hover:bg-blue-500'
              : 'bg-green-500 hover:bg-blue-500'
            } shadow-md border border-transparent rounded-lg text-lg px-5 
    py-2 mb-2 my-0 w-full transition-transform transform hover:scale-105`}
        >
          <div className="flex items-center justify-center">
            <h2 className="mr-2 text-white">Add Post</h2>
          </div>
        </button>
      </div>
      <PostCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allposts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more Posts</button>
        </Link>
      </div>
      <Track />
    </Layout>
  )
}

export default Home