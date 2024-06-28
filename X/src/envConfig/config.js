const config = {
    appwriteEndpoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteUserProfileId : String(import.meta.env.VITE_APPWRITE_USERPROFILE_BUCKET_ID),
    appwriteCommentCollectionId : String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
}

export default config