"use client"
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Send } from 'react-feather'
import { useRouter } from 'next/navigation'

function BottomBar() {
  const router = useRouter();

  const [ message, setMessage ] = useState<string>('')

  const handleSubmit = async (event) => {
    event?.preventDefault()
    if (!message) {
      return alert('none to send')
    }
    try {
      const response = await fetch('/api/insert-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message})
      })
      if (!response.ok) throw new Error('Failed to send message');

      router.refresh();
      console.log(response);
    } catch (error) {
      return alert(error)
    }
  }
  const onChange = (e) => {
    setMessage(e.target.value)
  }


  return (
    <>
      <form onSubmit={handleSubmit} className='flex'>
        <Input placeholder="Insert Message" onChange={onChange} />
        <Button type='submit'>
          <Send/>
        </Button>
      </form>

    </>
  )
}

export default BottomBar