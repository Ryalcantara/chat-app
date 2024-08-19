import React from 'react'
import BottomBar from './parts/BottomBar'
import { Card } from '@/components/ui/card'
import Messages from './messages/messages'




async function ChatBody() {


  const response = await fetch('http://localhost:3000/api/get-message', {
    next: {
      revalidate: 5
    }
  })

  const data = await response.json()


  return (
    <div className='flex flex-col w-full justify-between overflow-auto'
      style={{
        height: 'calc(100dvh - 40px)'
      }}>
      <div className='overflow-auto flex flex-col items-end gap-4'>
     <Messages data={data} />
      </div>
      <BottomBar />
    </div>
  )
}

export default ChatBody