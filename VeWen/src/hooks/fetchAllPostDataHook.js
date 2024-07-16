import service from "../appwrite/Service"

async function fetchAllPostDataHook() {
        try {
            const data = {
                allPosts: null,
            }
    
            console.time()
            const posts = await service.getAllPost()
            data.allPosts = posts.documents.reverse()
            
            console.timeEnd()
    
            return data
        }
    
    
        catch (error) {
            console.error(error.message)
        }
}

export default fetchAllPostDataHook