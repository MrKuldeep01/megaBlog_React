import { Account, ID } from "appwrite";
import client from "./client";

// Owns Appwrite account/session concerns only (SRP) — no post or file logic here.
export class AuthService {
  account = new Account(client);

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(ID.unique(), email, password, name);
    if (!userAccount) return userAccount;
    return this.login({ email, password });
  }

  async login({ email, password }) {
    return this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AuthService.getCurrentUser failed:", error);
      return null;
    }
  }

  async logout() {
    await this.account.deleteSessions();
    return true;
  }
}

const authService = new AuthService();
export default authService;
