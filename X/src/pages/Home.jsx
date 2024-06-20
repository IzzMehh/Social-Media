import React from 'react'

function Home() {
    const fn = (e) =>{
        e.preventDefault()
        console.log('sumbited!!')
    }
  return (
    <form onSubmit={fn} className='w-full text-white border-y'>
         <div className='w-full flex'>
            <div className='h-[50px] rounded-full'>
                <img className='h-full' src="logo.png" alt="" />
            </div>
            <div className='w-full relative '>
                <textarea name="" id="" autoComplete='off' placeholder='Whats on your Mind!?' className='w-full p-2 bg-transparent  outline-none focus:border-b'></textarea>
                <div className='grid grid-cols-[20%,80%] '>
                <div className='relative text-blue-700 '>
                    <input type="file" className='opacity-0 h-7 w-10 absolute cursor-pointer' name="" id="" />
                    <button className=' w-10 h-7 hover:bg-[#4a68b06b]'><ion-icon name="image-outline"></ion-icon></button>
                </div>
                <div className='flex justify-end '>
                    <button type="submit" className='relative right-0 bg-blue-700 py-3 px-10 font-semibold rounded-full'>Post</button>
                </div>
                </div>
            </div>
         </div>
    </form>
  )
}

export default Home