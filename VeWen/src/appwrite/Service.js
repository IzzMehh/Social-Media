import config from "../envConfig/config";
import { Client , Databases, Storage ,ID,Query} from "appwrite"; 

class AppService{
    client = new Client()
    database;
    bucket;
    userProfile; 

    constructor(){
        this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId)

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
        this.userProfile = new Storage(this.client)
    }

    async getAllPost(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.limit(1000)
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getPost(postId){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getUserPost(userId){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("userId", userId)
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }

    async createPost(content,images,videos,userId,username){
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    content: content,
                    images: images,
                    videos:videos,
                    likes: [],
                    userId:userId,
                    username:username,
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async updatePostLikes(postId,likes,comments){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                {
                    likes: likes,
                    comments:comments,
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async updatePostComments(postId,comments){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                {
                    comments:comments,
                }
            )
        } catch (error) {
            console.log(error)
        }
    }



    async deletePost(postId){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
            )
            return true
        } catch (error) {
            console.log(error)
        }
        return false
    }

    async createComment(userId,postId,username,content){
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentCollectionId,
                ID.unique(),
                {
                    userId:userId,
                    postId:postId,
                    username:username,
                    content: content,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deleteComment(postId){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentCollectionId,
                postId,
            )
            return true
        } catch (error) {
            throw error
        }
    }

    async getAllComment(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCommentCollectionId,
                [
                    Query.limit(1000)
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }

    async uploadFile(file){
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file,
        )
    }
    
    getFilePreview(fileId){
        try {
            return this.bucket.getFileView(
                config.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log(error)
        }
    }

    async uploadProfileImage(userId,file){
        try {
            return await this.userProfile.createFile(
                config.appwriteUserProfileId,
                userId,
                file,
            )
        } catch (error) {
         console.log(error)   
        }
    }

    async deleteProfileImage(fileId){
        try {
            await this.userProfile.deleteFile(
                config.appwriteUserProfileId,
                fileId,
            )
        } catch (error) {
            console.log(error)
        }
    }

    getProfileImage(userId){
        try {
            return this.userProfile.getFileView(
                config.appwriteUserProfileId,
                userId,
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProfileImages(){
        try {
            return await this.userProfile.listFiles(
                config.appwriteUserProfileId,
            )
        } catch (error) {
            console.log(error)
        }
    }
    


}

            // return 'https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?rs=1&pid=ImgDetMain'

const service = new AppService()
export default service