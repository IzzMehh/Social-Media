
import service from "../appwrite/Service";

async function fetchAppwriteDataHook() {

    try {
        const data = {
            allPosts: null,
            allComments: null,
            usersProfile: null,
        }

        const posts = await service.getAllPost()
        data.allPosts = posts.documents.reverse()

        const comments = await service.getAllComment()
        data.allComments = comments.documents.reverse()

        const profiles = await service.getAllProfileImages()
        data.usersProfile = profiles.files

        return data
    }


    catch (error) {
        console.error(error.message)
    }
}


export default fetchAppwriteDataHook