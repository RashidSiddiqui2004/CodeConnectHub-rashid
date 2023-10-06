import React from 'react'
import Navbar from '../navbar/Navbar'
import CodingForumFooter from '../footer/Footer'

function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className="content">
            {children}
        </div>
        <CodingForumFooter/>
    </div>
  )
}

export default Layout