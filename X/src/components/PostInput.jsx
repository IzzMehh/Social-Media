import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

function PostInput() {
  const inputDiv = useRef(null);
  const { register, handleSubmit, setValue } = useForm();

  const [file,setFile] = React.useState([])

  const onSubmit = (data) => {
    console.log('Submitted!!');
    console.log(data);
  };

  const imgSelecterFn = () => {
    inputDiv.current.click();
  };

  const handleFileChange = (e) => {
    if(file.length < 4){
    const tempFile = e.target.files[Number(e.target.files.length)-1];
    setFile(prevVal => [...prevVal, URL.createObjectURL(tempFile)])
    setValue('image', tempFile);
    console.log(tempFile);
    inputDiv.current.value = null
    }
  };

  const removeFile = (index) =>{
    console.log("index : ", index)
    console.log("file : ", file)
    const arr = [...file]
    arr.splice(index,1)
    setFile([...arr])
    console.log('after file: ', file)
    console.log('length: ' ,file.length)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full text-white border-y py-1">
        <div className='w-full flex'>
          <div className='h-[50px] rounded-full'>
            <img className='h-full' src="logo.png" alt="" />
          </div>
          <div className='w-full relative'>
            <textarea
              {...register('content')}
              rows={5}
              maxLength={300}
              name="content"
              autoComplete='off'
              placeholder='Whats on your Mind!?'
              className='w-full p-2 bg-transparent outline-none focus:border-b'
            ></textarea>

            {(file.length > 0) && <div className={`h-[300px] ${(file.length > 1) ? `grid grid-cols-2 `: '' } ${(file.length > 2) ? `grid-rows-2 `: '' } gap-2`}>
                {file.map((url,index)=>(
                    <div className='flex' key={index}>
                    <div className='text-2xl'><span onClick={()=>removeFile(index)}                    
                    className='cursor-pointer hover:text-[#d4d2d270]'><ion-icon name="close"></ion-icon></span>
                    </div>
                    <img src={url} className='h-full w-[70%] m-auto' />
                    </div>
                ))}
                </div>}
            
            <div className='grid grid-cols-[20%,80%]'>
              <div className='relative text-blue-700'>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  ref={inputDiv}
                  hidden
                  onChange={handleFileChange}
                />
                <button type='button' onClick={imgSelecterFn} className='w-10 h-7 hover:bg-[#1d1d1d]'>
                  <ion-icon name="image-outline"></ion-icon>
                </button>
              </div>
              <div className='flex justify-end'>
                <button type="submit" className='relative right-0 bg-blue-700 py-3 px-10 font-semibold rounded-full'>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PostInput;
