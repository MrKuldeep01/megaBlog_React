import { Databases, Query } from "appwrite";
import client from "./client";
import config from "../../config/env";

// Owns post *document* CRUD only (SRP) — file/storage concerns live in storage.service.js.
export class PostsService {
  databases = new Databases(client);

  async createPost({ title, slug, content, featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(config.appwriteDbId, config.appwriteCollection, slug, {
        title,
        content,
        featuredimage,
        status,
        userid,
      });
    } catch (error) {
      console.log("PostsService.createPost failed:", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(config.appwriteDbId, config.appwriteCollection, slug, {
        title,
        content,
        featuredimage,
        status,
      });
    } catch (error) {
      console.log("PostsService.updatePost failed:", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(config.appwriteDbId, config.appwriteCollection, slug);
      return true;
    } catch (error) {
      console.log("PostsService.deletePost failed:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(config.appwriteDbId, config.appwriteCollection, slug);
    } catch (error) {
      console.log("PostsService.getPost failed:", error);
      return false;
    }
  }

  async listPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(config.appwriteDbId, config.appwriteCollection, queries);
    } catch (error) {
      console.log("PostsService.listPosts failed:", error);
      return false;
    }
  }
}

const postsService = new PostsService();
export default postsService;
