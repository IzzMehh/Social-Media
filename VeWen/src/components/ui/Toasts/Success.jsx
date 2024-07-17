import React from 'react'


function Success({ message, setToast }) {

  React.useEffect(() => {
    setTimeout(() => {
      setToast(false)
    }, 3000)  
  }, [])

  return (
    <div className=" min-w-[250px] sm:h-14 absolute right-0 sm:right-5 top-5 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
      <div className="flex p-4">
        <div className="flex-shrink-0 relative ">
          <svg className="flex-shrink-0 size-3 sm:size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>
        </div>
        <div className="ms-2">
          <p className="text-[10px] font-content sm:text-base text-gray-700 dark:text-neutral-400">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Success

