import supertest from "supertest";
import config from "../config/config.js";

const url = config.baseUrl;

const newUser = {
    createNewUser: (payload) => {
        return supertest(url)
            .post('/User')
            .set('Accept', 'application/json')
            .send(payload);
    },
    generateToken: (payload) => {
        return supertest(url)
            .post('/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload);
    },
    getAuthorizedOption: (payload) => {
        return supertest(url)
            .post('/Authorized')
            .set('Accept', 'application/json')
            .send(payload);
    },
    deleteUser: (uid) => {
        return supertest(url)
            .delete(`/User/${uid}`)
            .set('Accept', 'application/json')
            .send();
    },
    getUserInfo: (uid) => {
        return supertest(url)
            .get(`/User/${uid}`)
            .set('Accept', 'application/json')
            .send();
    },
    async getUserUID() {
        const payload = config.credentials.success;
        const result = await this.createNewUser(payload);
        await this.generateToken(payload);
        return result._body.userID;
    },
    async isAuthorizeNewUser() {
        const payload = config.credentials.success;
        await this.createNewUser(payload);
        await this.generateToken(payload);
        return await this.getAuthorizedOption(payload);
    },
    async getTokenForUser(payload = config.credentials.success) {
        await this.createNewUser(payload);
        return await this.generateToken(payload);
    },

};

export default newUser;