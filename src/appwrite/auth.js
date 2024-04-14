import conf from '../conf/conf.js';

import { Client, Account, ID } from "appwrite";



export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);




    }

    async createAccount({ email, password, name }) {
        try {
            const userAcoount = await this.account.create(ID.unique(), email, password, name);
            if (userAcoount) {
                return this.login({ email, password });
            }
            else {

                return userAcoount;
            }

        } catch (error) {

            console.error(error);
            throw error;
        }
    }
    async login({ email, password }) {
        try {
            console.log(typeof email, typeof password);
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            if (error.response && error.response.code === 403) {

                console.error("User does not have required permissions to access account information.");

                return null;
            } else {

                console.error("Error while fetching user information:", error);
                throw error;
            }
        }
    }


    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    }
    googleauth() {
        try {
            return this.account.createOAuth2Session("google",
                'http://localhost:5173/',
                "http://localhost:5173/fail"
            );
        } catch (error) {
            console.error("Error during google auth:", error);
            throw error;
        }
    }

}

const authService = new AuthService();


export default authService;