
const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDbId : String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucket : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymcekey : String(import.meta.env.VITE_TINYMCE_KEY),
}

export default config;