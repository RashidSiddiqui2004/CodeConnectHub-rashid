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
      <Filter />

      <div className="width-[900px] my-[20px]">
        <button
          onClick={add}
          type="button"
          className="focus:outline-none bg-green-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] 
          border hover:bg-blue-500 outline-0 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 my-7 mx-[480px] w-[600px] text-center"
          style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} > <div className="flex gap-2 items-center">
            <h2 className='mx-[230px] text-[20px] h-9 my-1 text-white hover:text-red-200'>Add Post </h2>
          </div></button>
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