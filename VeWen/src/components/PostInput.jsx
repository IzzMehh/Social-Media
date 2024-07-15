import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import service from '../appwrite/Service';
import { useSelector,useDispatch } from 'react-redux';
import { fetchAppwriteData } from '../store/serviceSlice';
import {Button} from './index';

function PostInput({profileImgs = [], commentInput=false,postId=0, reduxImgId,placeholder="" }) {
  const inputDiv = useRef(null);
  const { register, handleSubmit, setValue } = useForm();

  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState([])

  const fileId = []
  const videoId =[]

  const userData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()

  const haveProfile = profileImgs.some(imgData => imgData.$id === userData.$id)

  const createPost = async (data) => {
    setUploading(true)

    if (file && file.length > 0) {
      for (const i in file) {
        if(file[i].type === 'video/mp4'){
        const videos = await service.uploadFile(file[i])
        videoId.push(videos.$id) 
        }else{
        const images = await service.uploadFile(file[i])
        fileId.push(images.$id)
        }
      }
    }

    await service.createPost(data.content, fileId,videoId, userData.$id, userData.name)
    dispatch(fetchAppwriteData())
    setUploading(false)
  };

  const imgSelecterFn = () => {
    inputDiv.current.click();
  };

  const handleFileChange = (e) => {
    if (file.length < 4) {
      const tempFile = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "video/mp4"]
      if(allowedTypes.includes(tempFile.type)){
      setFile(prevVal => [...prevVal, tempFile])
      setValue('image', tempFile);
      inputDiv.current.value = ''
      console.log(tempFile)
      }
    }
  };

  const removeFile = (index) => {
    const arr = [...file]
    arr.splice(index, 1)
    setFile([...arr])
  }

  const createComment = async(data) =>{
    try {
      setUploading(true)
      await service.createComment(userData.$id,postId,userData.name,data.content)
      const getPostData = await service.getPost(postId) 
      await service.updatePostComments(postId,[...getPostData.comments,userData.$id])
      await dispatch(fetchAppwriteData())
      // fetchData(true)
      setUploading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(commentInput ? createComment : createPost)} className="w-full text-white border-y py-1">
        <div className='w-full flex'>
          <div>
            <img className='h-[40px] w-[40px] rounded-full' src={haveProfile ? String(service.getProfileImage(userData.$id)) + `&${reduxImgId}` : service.getProfileImage('66796078001f62ddc452')} alt="" />
          </div>
          <div className='w-full relative'>
            <textarea
              {...register('content',{
                required:true
              })}
              rows={5}
              maxLength={300}
              name="content"
              autoComplete='off'
              placeholder={placeholder}
              className='w-full p-2 bg-transparent outline-none focus:border-b'
            ></textarea>

            {commentInput ? null
            : <>
            {(file.length > 0) && <div className={`${(file.length > 1) ? `grid grid-cols-2 ` : 'grid grid-rows-1'} ${(file.length > 2) ? `grid-rows-2 ` : ''} gap-2`}>
              {file.map((url, index) => {
                if (url.type === "video/mp4") {
                  return (
                    <div className='flex' key={index}>
                      <div className='text-2xl'><span onClick={() => removeFile(index)}
                        className='cursor-pointer hover:text-[#d4d2d270]'><ion-icon name="close"></ion-icon></span>
                      </div>
                      <video controls src={URL.createObjectURL(url)} className='h-[100px] sm:h-[200px] m-auto' />
                    </div>
                  )
                }
                return (
                  <div className='flex' key={index}>
                    <div className='text-2xl'><span onClick={() => removeFile(index)}
                      className='cursor-pointer hover:text-[#d4d2d270]'><ion-icon name="close"></ion-icon></span>
                    </div>
                    <img src={URL.createObjectURL(url)} className='h-[100px] sm:h-[200px] m-auto' />
                  </div>
                )
              })}
            </div>}
            </> }

            <div className={`flex w-full ${commentInput ? 'justify-end' : 'justify-between'}`}>
              {commentInput 
              ? null
              : <div className='relative text-blue-700'>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4"
                ref={inputDiv}
                hidden
                onChange={handleFileChange}
              />
              <button type='button' onClick={imgSelecterFn} className='w-10 h-7 hover:bg-[#1d1d1d]'>
                <ion-icon name="image-outline"></ion-icon>
              </button>
            </div> }
            
              <div className='flex justify-end'>
                  <Button text={uploading ?
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
                    'Post'} classes={'right-0 font-semibold px-10 '}/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PostInput;
