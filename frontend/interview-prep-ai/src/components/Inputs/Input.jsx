import { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'


function Input({value, onChange, label, placeholder, type}){
  
  const [showPassword, setShowPassword] = useState(false)
  function togglePass(){
    setShowPassword(!showPassword)
  }
  
  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>
        <div className='w-full flex justify-center itmes-center h-[40px] bg-black/4 rounded-lg px-5 py-1 border-2 border-white hover:border-orange-300'>
            <input
                type={
                    type=="password" ? (showPassword ? "text" : "password") : type
                }
                placeholder={placeholder}
                className='w-full outline-none bg-transparent'
                value={value}
                onChange={(e) => {onChange(e)}}
            />    
            {type === "password" && (
              <>
                {showPassword ? (
                  <FaRegEye
                    size={22}
                    className='text-orange-400 cursor-pointer mt-[4px]'
                    onClick={() => togglePass()}
                  />
                ) : 
                (
                  <FaRegEyeSlash
                    size={22}
                    className='text-slate-400 cursor-pointer mt-[4px]'
                    onClick={() => togglePass()}  
                  />
                )
              }
              </>
            )}
        </div>
    </div>
  )
}
export default Input;
