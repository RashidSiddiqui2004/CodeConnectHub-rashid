import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { FaArrowRight } from 'react-icons/fa';

function PostCard() {
    const context = useContext(myContext)
    
    const { mode, post, searchkey, setSearchkey, filterType } = context

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-2 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Latest Posts</h1>
                    <div className="h-1 w-[250px] bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">

                    {/* 
                     .filter((obj) => obj.price.includes(filterPrice)).slice(0,8) */}

                    {post.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.tags.toLowerCase().includes(filterType)).map((item, index) => {
                            const { title, tags, description, imageUrl, id } = item;
                            const tagList = tags.split(", ");
                            return (
                                <div key={index} className="p-4 md:w-1/3  drop-shadow-lg" >
                                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer" >
                                            <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>

                                            <p className="leading-relaxed mb-3">{description.slice(0, 150)}...</p>


                                            <div className="flex flex-wrap gap-2 my-2">
                                                {tagList.map((tag, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-blue-500 text-white rounded-full py-1 px-2 text-sm"
                                                    >
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>

                                            <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer" >
                                                {/* <button class="py-2 px-4 bg-gradient-to-r from-red-500 to-red-300 text-white border-2 border-red-600 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                                                    Continue Reading
                                                </button> */}

                                                <button className="bg-white py-2 px-4 rounded-2xl
                                                 border border-gray-300 shadow-md flex items-center space-x-2 
                                                 hover:shadow-lg transition-transform transform hover:scale-105 border-x-fuchsia-200 text-rose-400">
                                                    <FaArrowRight />
                                                    Continue Reading
                                                </button>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            )
                        })}




                </div>

            </div>
        </section >

    )
}

export default PostCard