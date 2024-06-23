import config from "../envConfig/config";
import { Client , Databases, Storage ,ID,Query} from "appwrite"; 

class AppService{
    client = new Client()
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId)

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
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

    async createPost({content,image=[],userId}){
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                appwriteCollectionId,
                ID.unique(),
                {
                    content,
                    image,
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

    async getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
}

const service = new AppService()
export default service