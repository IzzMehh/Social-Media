import React from 'react'

function Error({ message, setError }) {

  React.useEffect(() => {
    setTimeout(() => {
      setError(false)
    },3000)
  }, [])

  return (
    <div className="transition-all min-w-[250px] sm:h-14 absolute right-0 sm:right-5 top-5 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
      <div className="flex p-4">
        <div className="flex-shrink-0 relative ">
          <svg className="flex-shrink-0 size-3 sm:size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
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

export default Error