
import conf from '../conf/conf.js';

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import { toast } from "react-toastify";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPosts(slug, { title, content, feature_img, status, userId, username }) {


        try {
            const result = await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    feature_img,
                    status,
                    userId,
                    username,


                }
            )
            return result;
        }
        catch (e) {
            console.log(e);
        }


    }
    async updatePost(slug, { title, content, feature_img, status, username, like }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feature_img,
                    status,
                    username,
                    like

                }
            )


            return result;
        }
        catch (e) {
            console.log(e);
        }
    }
    async deletepost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug

            );
            return true;

        } catch (e) {
            console.log(e);
            return false;
        }
    }
    async getPost(slug) {

        try {
            const result = await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
            return result;
        } catch (e) {
            console.log(e);
        }
    }
    async getPosts() {
        try {
            const result = await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                // [Query.equal("status", "active")]
            );

            return result;
        } catch (e) {
            console.log(e);
        }
    }
    async getPostswithquery({ query }) {
        try {
            const result = await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                // [Query.equal("status", "active")]
                // [Query.equal(...query)]
                [Query.equal("userId", "6612c0782339bbc761a7")]
            );

            return result;
        } catch (e) {
            console.log(e);
        }
    }
    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            );
            console.log(result, "feature_img upload details :")
            return result;
        } catch (e) {
            console.log(e);
        }
    }
    async deleteFile(fileId) {
        if (fileId === "") return true;
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            );
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    getFile(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        );
    }
    async getFileOriginal(fileId) {
        return this.bucket.getFileView(
            conf.appWriteBucketId,
            fileId
        );
    }



}


const service = new Service();
export default service;