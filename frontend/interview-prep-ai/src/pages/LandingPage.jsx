import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LuSparkles} from 'react-icons/lu'


import Modal from '../components/Modal'; 
import Login from '../pages/Auth/Login'; 
import Signup from '../pages/Auth/Signup'; 
import {UserContext} from '../context/UserContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

import Sample from '../assets/sampleimg.png'
//import { App_features } from "../utils/data" 


function LandingPage() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    function handleCTA(){
        if(!user){
            setOpenAuthModal(true);
        }
        else{
            navigate("/dashboard");
        }
    
    }
  
    return (
        <div className='w-[100%] mx-auto'>
            <div className='w-full px-20 py-5 min-h-full bg-[#FFFCEF]'>
                <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0'></div>
                
                <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
                    <header className='flex justify-between items-center mb-16'>
                        <div className='text-xl font-bold text-black'>
                            Interview Prep AI
                        </div>
                        {user ? <ProfileInfoCard/> : <button className='bg-orange-400 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black duration-200 cursor-pointer' onClick={() => {setOpenAuthModal(true)}}>Login / Sign Up

                        </button>}
                        
                    </header>
                    
                    <div className='flex flex-col md:flex-row items-center'>
                        <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
                            <div className='flex items-center justify-left mb-2'>
                                <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                                    <LuSparkles/>AI Powered
                                </div>
                            </div>
                            <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>Ace Interviews with <br />
                                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>AI-Powered</span>{" "}
                                Learning
                            </h1>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <p className='text-[17px] text-gray-900 mr-20 md:mr-20 mb-6'>Get role-speacific questions, expand answers when you need them, 
                                dive deeper into concepts and organize everything your way.
                                From preparation to mastery your ultimate interview toolkit is
                                here.
                            </p>
                            <button className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer
                            ' onClick={handleCTA}>Get Started</button>
                        </div>
                </div>
            </div>
            </div>
        
            <div className='w-full min-h-full relative z-10 mb-36'>
                <div>
                    <section className='flex items-center justify-center -mt-36'>
                        <img src={Sample} alt="er" className='w-[80vw] rounded-lg border-2 border-amber-400'/>
                    </section>
                </div>
            </div>
        
            <div>
                <div>
                    <section>
                        
                    </section>
                </div>
            
                <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
                    Made by Harsh
                </div>
            </div>
        
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideheader
            >
                <div>
                    {currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage}/>
                    )}
                    {currentPage === "signup" && (
                        <Signup setCurrentPage={setCurrentPage}/>
                    )}
                </div>
            </Modal>   
        
       </div>

    )
}

export default LandingPage;
