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
        } catch (error) {
            console.log(error)
        }
    }

}

const authservice = new AuthService
export default authservice