import React from 'react'

function Button({text,classes,svg=null,sideBarButton=false}) {
    return (
        <button
            className={`"bg-[#292929] border-2 ${sideBarButton ? 'border-none' :'border-[#3e3e3e]'} rounded-lg text-white px-6 py-3 hover:border-[#fff] cursor-pointer transition" ${classes}`}
        >
            <div className='flex items-center'>
            {svg ? <ion-icon name={svg}></ion-icon> : null}
            <span className={svg ? 'ml-2' : null}>{text}</span>
            </div>
        </button>

    )
}

export default Button