import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import service from '../appwrite/Service';
import { useSelector } from 'react-redux';

function PostInput({ fetchPostFn, profileImgs=[] }) {
  const inputDiv = useRef(null);
  const { register, handleSubmit, setValue } = useForm();

  const [uploading, setUploading] = useState(false)

  const [file, setFile] = useState([])
  const fileId = []

  const userData = useSelector((state) => state.auth.userData)

  const haveProfile = () =>{
    console.log(profileImgs)
    return profileImgs.some(imgData => imgData.$id == userData.$id)
  }

  const onSubmit = async (data) => {
    setUploading(true)

    if (file && file.length > 0) {
      for (const i in file) {
        const files = await service.uploadFile(file[i])
        fileId.push(files.$id)
      }
    }

    await service.createPost(data.content, fileId, userData.$id, userData.name)
    fetchPostFn(true)
    setUploading(false)
  };

  const imgSelecterFn = () => {
    inputDiv.current.click();
  };

  const handleFileChange = (e) => {
    if (file.length < 4) {
      const tempFile = e.target.files[0];
      setFile(prevVal => [...prevVal, tempFile])
      setValue('image', tempFile);
      console.log(tempFile);
      inputDiv.current.value = ''
    }
  };

  const removeFile = (index) => {
    const arr = [...file]
    arr.splice(index, 1)
    setFile([...arr])
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full text-white border-y py-1">
        <div className='w-full flex'>
          <div>
            <img className='h-[45px] rounded-full' src={haveProfile() ? String(service.getProfileImage(userData.$id))+`&mode=admin ${new Date().getTime()}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
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

            {(file.length > 0) && <div className={`${(file.length > 1) ? `grid grid-cols-2 ` : 'grid grid-rows-1'} ${(file.length > 2) ? `grid-rows-2 ` : ''} gap-2`}>
              {file.map((url, index) => (
                <div className='flex' key={index}>
                  <div className='text-2xl'><span onClick={() => removeFile(index)}
                    className='cursor-pointer hover:text-[#d4d2d270]'><ion-icon name="close"></ion-icon></span>
                  </div>
                  <img src={URL.createObjectURL(url)} className='h-[200px] m-auto' />
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
                <button type="submit" className='relative right-0 bg-blue-700 py-4 px-10 font-semibold rounded-full'>
                  {uploading ?
                    <>
                      <div
                        class="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status">
                        <span
                          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading... </span>
                      </div>
                    </>
                    :
                    'Post'}
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
