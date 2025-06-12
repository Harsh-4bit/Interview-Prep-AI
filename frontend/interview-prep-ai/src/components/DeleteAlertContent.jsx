import React from 'react'

const DeleteAlertContent = ({content, onDelete}) => {
  return (
    <div className='p-5'>
        <p className='text-[14px]'>{content}</p>
    
        <div className='flex justify-end mt-6'>
            <button className="w-25 h-9 bg-orange-400 text-white hover:bg-amber-400 rounded-[20px] cursor-pointer duration-200" type='button' onClick={onDelete}>Delete</button>
        </div>
    </div>
  )
}

export default DeleteAlertContent