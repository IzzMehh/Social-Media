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

    async updatePost(postId,likes,comments){
        try {
            // const currentData = await this.getPost(postId)
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                {
                    // ...currentData,
                    likes: likes,
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

    async isProfile(){
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