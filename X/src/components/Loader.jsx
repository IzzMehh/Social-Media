import React from 'react'

function Loader() {
    return (
        <div className='h-full flex items-center justify-center'>
            <div class="flex flex-row gap-2">
                <div class="w-[50px] h-[50px] rounded-full bg-blue-700 animate-bounce"></div>
                <div class="w-[50px] h-[50px] rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-[50px] h-[50px] rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}

export default Loader