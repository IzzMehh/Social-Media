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
        const userAccount = await this.account.create(ID.unique(),email,password,name)
        console.log(userAccount)
        return userAccount
        } catch (error) {
            console.log(error)
        }
    }

    async login({email,password}){
        try {
            const loginData = await this.account.createEmailPasswordSession(email,password)
            console.log(loginData)
            return loginData
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrentUser(){
        try {
            const userData = await this.account.get()
            console.log(userData)
            return userData
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