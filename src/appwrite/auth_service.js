import config from "../../config/envconfig";
import { Client, Account, ID } from "appwrite";

/*
const client = new Client()
    .setEndpoint(`${config.appwriteUrl}`) // Your API Endpoint
    .setProject(`${config.appwriteProjectId}`);                 // Your project ID

const account = new Account(client);

const user = await account.create(
    ID.unique(), 
    'email@example.com', 
    'password'
);
*/

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if(userAccount){
//if a/c created then login 
      return this.login({email,password})
      }
      else{
        return userAccount;
      }
    } catch (err) {
      throw err;
    }
  }

  async login({email,password}){
    try {
      return this.account.createEmailPasswordSession(email,password);
    } catch (error) {
      throw error
    }
  }

  async getCurrentUser({email,password}){
    try {
      return this.account.get();
    } catch (error) {
      console.log(error)
    }
    return null;
  }

  async logout (){
  try {
    await this.account.deleteSessions()
  } catch (error) {
    throw error;
  }

  }

}

const authService = new AuthService();

export default authService;
