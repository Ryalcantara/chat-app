import React from 'react'
import * as Icon from 'react-feather';

function SideNav() {
  return (
    <div className='h-dvh w-20 bg-slate-500 flex justify-center py-10'>
      <Icon.MessageCircle size={50} strokeWidth='3' className='text-white'/>
    </div>
  )
}

export default SideNav