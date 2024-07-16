import service from '../../../appwrite/Service';

async function likesHandler(setLikesData,postId,currentUserData){
      try {
        let updatedLikes;
        const newPostData = await service.getPost(postId)
        const newLikeData = newPostData.likes
        if (!newLikeData.includes(currentUserData.$id)) {
          updatedLikes = [...newLikeData, currentUserData.$id];
          setLikesData(updatedLikes);
        } else {
          updatedLikes = newLikeData.filter(id => id !== currentUserData.$id);
          setLikesData(updatedLikes);
        }
        await service.updatePostLikes(postId, updatedLikes);
        console.log('did likes handler')
      } catch (error) {
        console.error(error);
      }
    }

export default likesHandler