import React from 'react'
import SideNav from '@/components/SideNav/sideNav';
import ChatBody from '@/components/ChatBody/ChatBody'

function App() {
  return (
    <div className='flex'>
        <SideNav/>
        <ChatBody/>
    </div>
  )
}

export default App