import React, { useContext, useState} from 'react'
import myContext from '../../../context/data/myContext'
// import CodeEditor from './Codeeditor';
import MonacoEditor from "react-monaco-editor";
import "./styles.css"

function AddProduct() {
    const context = useContext(myContext);
    const { posts, setPosts, addPost } = context;
    // const [code, setCode] = useState(""); // Store code content here
    const [language, setLanguage] = useState("javascript"); // Default language

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };


    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div>
            <div className='flex justify-center items-center postbg'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl postform'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add a Post</h1>
                    </div>
                    <div>
                        <input type="text"
                            value={posts.title}
                            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2  w-full lg:w-[20em] inputbox rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Post Title'
                        />
                    </div>
                    <div>
                        <textarea cols="40" rows="10" name='description'
                            value={posts.description}
                            onChange={(e) => setPosts({ ...posts, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='POST description..'>

                        </textarea>
                    </div>
                    <div>
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>

                            <div className="mb-4">
                                <label htmlFor="language" className="block font-semibold mb-2">
                                    Select Language:
                                </label>
                                <select
                                    id="language"
                                    value={posts.language}
                                    // onChange={handleLanguageChange}
                                    onChange= {(e) => setPosts({ ...posts, language: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="c">C</option>
                                    <option value="cpp">C++</option>
                                    <option value="kotlin">Kotlin</option>
                                </select>
                            </div>


                            <label htmlFor="code" className="block font-semibold mb-2">
                                Code:
                            </label>
                            <MonacoEditor
                                width="100%"
                                height="300"
                                language={language}
                                theme="vs-light"
                                // value={code}
                                // onChange={handleCodeChange}
                                value={posts.code} 
                                onChange= {(e) => setPosts({ ...posts, code: e.target.value })}
                                options={{
                                    wordWrap: "on",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <input type="text"
                            value={posts.imageUrl}
                            onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-3 w-full lg:w-[20em] rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add an Image Url'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={posts.tags}
                            onChange={(e) => setPosts({ ...posts, tags: e.target.value })}
                            name='tags'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Tags'
                        />
                    </div>

                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addPost}
                            className=' bg-yellow-500 w-full text-black font-bold inputbox px-2 py-2 rounded-lg'>
                            Post
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct