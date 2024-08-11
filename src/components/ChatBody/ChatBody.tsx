import React from 'react'
import BottomBar from './parts/BottomBar'
import { Card } from '@/components/ui/card'

interface message {
  id: string,
  message_content: string,
  user_id: string,
  container_id: string,
  reciever_id: string,
  created_at: string
}


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
        {data.success.map((item: message) => (
          <div key={item.id} className='rounded-full bg-black text-white p-3 flex w-fit'>
            
            {item.message_content}
          </div>
        ))}
      </div>
      <BottomBar />
    </div>
  )
}

export default ChatBody