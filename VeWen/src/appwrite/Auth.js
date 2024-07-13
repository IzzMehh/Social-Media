import config from "../envConfig/config";
import { Client, Account,ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
        return await this.account.create(ID.unique(),email,password,name)
        } catch (error) {
            console.log(error)
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error)            
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSession('current')
        } catch (error) {
            console.log(error)
        }
    }

}

const authservice = new AuthService
export default authservice