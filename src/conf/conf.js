const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appWriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appWriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
}
export default conf;