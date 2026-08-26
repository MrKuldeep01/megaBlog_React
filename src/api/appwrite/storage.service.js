import { Storage, ID, Permission, Role } from "appwrite";
import client from "./client";
import config from "../../config/env";

// Owns file storage concerns only (SRP) — upload/preview/download/delete.
export class StorageService {
  bucket = new Storage(client);

  async uploadFile(file) {
    try {
      // Explicit public-read permission — without it, Appwrite's "File Security"
      // leaves new files unreadable (previews/downloads fail with 403).
      return await this.bucket.createFile(config.appwriteBucket, ID.unique(), file, [
        Permission.read(Role.any()),
      ]);
    } catch (error) {
      console.log("StorageService.uploadFile failed:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucket, fileId);
      return true;
    } catch (error) {
      console.log("StorageService.deleteFile failed:", error);
      return false;
    }
  }

  async getFileView(fileId) {
    try {
      // getFileView (raw file passthrough) instead of getFilePreview
      // (on-the-fly image transformation) — we never pass resize params, so
      // there's no benefit to the transform endpoint, and it's a narrower
      // authorization path on Appwrite Cloud than plain file reads.
      return await this.bucket.getFileView(config.appwriteBucket, fileId);
    } catch (error) {
      console.log("StorageService.getFileView failed:", error);
      return false;
    }
  }

  async getFileDownload(fileId) {
    try {
      return await this.bucket.getFileDownload(config.appwriteBucket, fileId);
    } catch (error) {
      console.log("StorageService.getFileDownload failed:", error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
