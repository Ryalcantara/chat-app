"use client"
import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'react-feather';
import { useRouter } from 'next/navigation';
import { socket } from "@/socket";

function BottomBar() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message) {
      return alert('none to send');
    }
    try {
      const response = await fetch('/api/insert-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
      if (!response.ok) throw new Error('Failed to send message');

      const { success } = await response.json();

      // Emit the new message event to the server via socket.io
      socket.emit('send-message', {
        message_content: message,
        created_at: new Date().toISOString(),
      });

      setMessage(''); 
    } catch (error) {
      return alert(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target?.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex'>
        <Input placeholder="Insert Message" onChange={onChange} value={message} />
        <Button type='submit'>
          <Send />
        </Button>
      </form>
    </>
  );
}

export default BottomBar;