import config from "../../config/envconfig";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class dbService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDbId,
        config.appwriteCollection,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDbId,
        config.appwriteCollection,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDbId,
        config.appwriteCollection,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDbId,
        config.appwriteCollection,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async listPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDbId,
        config.appwriteCollection,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucket,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error, "from upload file dbService appwrite");
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucket, fileId);
      return true;
    } catch (error) {
      console.log(error, "from delete file dbService appwrite");
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appwriteBucket, fileId);
    } catch (error) {
      console.log(error, "from delete file dbService appwrite");
      return false;
    }
  }

  async getFileDownload(fileId) {
    try {
      const result = await this.bucket.getFileDownload(
        config.appwriteBucket,
        fileId
      );
      // console.log(result); // Resource URL
      if (result) {
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.log(`error in getting download link :: db_service :: appwrite`);
    }
  }
}

const dbservice = new dbService();
export default dbservice;
