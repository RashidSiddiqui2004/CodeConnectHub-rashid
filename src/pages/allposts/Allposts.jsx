import React, { useContext, useEffect } from 'react'
import Filter from '../../components/filter/Filter' 
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext' 

function Allposts() {
    const context = useContext(myContext)
    const { mode, post, searchkey, setSearchkey, filterType} = context


    return (
        <Layout>
            {/* <Filter /> */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-8 md:py-16 mx-auto">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Latest Posts</h1>
                        <div className="h-1 w-20 bg-pink-600 rounded"></div>
                    </div>

                    <div className="flex flex-wrap -m-4">
                        {post.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                            .filter((obj) => obj.tags.toLowerCase().includes(filterType)).map((item, index) => {
                                const { title, tags, description, imageUrl, id } = item;
                                const tagList = tags.split(", ");
                                return (
                                    <div onClick={() => window.location.href = `/productinfo/${id}`} key={index} className="p-4 md:w-1/3  drop-shadow-lg " >
                                        <div className="h-full border-2  hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <div className="flex justify-center cursor-pointer" >
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

                                           
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}

                    </div>

                </div>
            </section >
        </Layout>
    )
}

export default Allposts