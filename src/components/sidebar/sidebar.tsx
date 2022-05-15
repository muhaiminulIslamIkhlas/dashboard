import React from 'react'
import './sidebar.scss'

interface SidebarProps {
    children?: React.ReactNode;
}

const sidebar:React.FC<SidebarProps>=({children})=> {
  return (
    <div className='test'>{children}</div>
  )
}

export default sidebar;
