import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'
const DashboardLayout = ({children}) => {
  const {user} = useContext(UserContext)
  return (
    <div className='px-20'>
        <Navbar/>
        {user && <div>{children}</div>}

        
    </div>
  )
}

export default DashboardLayout