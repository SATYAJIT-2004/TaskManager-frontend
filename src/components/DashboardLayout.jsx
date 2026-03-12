import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({children,activeMenu}) => {
  const {currentUser} = useSelector((state)=>state.user)

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      
      <Navbar activeMenu={activeMenu}/>

      {currentUser && (
        <div className='flex flex-1 w-full'>

          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu}/>
          </div>

          {/* main content */}
          <div className='flex-1 w-full px-3 sm:px-5 lg:mx-5'>
            {children}
          </div>

        </div>
      )}

    </div>
  )
}

export default DashboardLayout