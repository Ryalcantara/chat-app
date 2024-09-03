import React from 'react'
import * as Icon from 'react-feather';
import { Input } from '../ui/input';

async function SideNav() {


  const response = await fetch('http://localhost:3000/api/get-users', {
    next: {
      revalidate: 5
    }
  })

  const data = await response.json()
  return (
    <div className='h-dvh w-96 border flex flex-col item-start py-10'>
      <div className='flex items-center justify-center'>

        <Input className='w-64 rounded-2xl' placeholder='Search'></Input>
      </div>
      <br />
      <hr />
      <div className='font-bold border-red-900'>
        <ul>


          <li >
            {data.data[0].username
            }
          </li>
        </ul>
      </div>

    </div>
  )
}

export default SideNav