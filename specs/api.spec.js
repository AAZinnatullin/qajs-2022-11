import {describe, expect, it} from "@jest/globals";
import config from "../framework/config/config.js";
import newUser from "../framework/services/user";


describe('Home Work 5', () => {
    it('Checks user create successfully', async () => {
        try {
            const res = await newUser.createNewUser(config.credentials.success);
            expect(res.status).toBe(201);
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });

    it('Checks error for create existing users', async () => {
        try {
            await newUser.createNewUser(config.credentials.static);
            const res = await newUser.createNewUser(config.credentials.static);
            expect(res.status).toBe(406);
        } catch (e) {
            expect(e.response.data.message).toBe('User exists!');
        }
    });

    it.each([
        'password12!',
        'Password121',
        'Password!',
        'Pass!21',
    ])('Checks error when user use simple password', async (password) => {
        const wrongPassword = {
            "password": password
        };
        const credentials = Object.assign(config.credentials.static, wrongPassword);
        try {
            const res = await newUser.createNewUser(credentials);
            expect(res.status).toBe(400);
        } catch (e) {
            expect(e.response.data.message).toBe(
                'Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), ' +
                'one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must ' +
                'be eight characters or longer.');
        }
    });

    it('Checks error for generation token', async () => {
        const wrongUsername = {
            "password": ''
        };
        const credentials = Object.assign(config.credentials.static, wrongUsername);
        try {
            const res = await newUser.generateToken(credentials);
            expect(res.status).toBe(400);
        } catch (e) {
            expect(e.response.data.message).toBe('UserName and Password required.');
        }
    });

    it('Checks successfull generated token', async () => {
        try {
            const res = await newUser.getTokenForUser();
            expect(res.status).toBe(200);
            expect(res._body.token).not.toBeNull();
            expect(res._body.result).toBe('User authorized successfully.')
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });

});

describe('HomeWork 7', () => {
    it('Checks successfully authorize new user', async () => {
        try {
            const res = await newUser.isAuthorizeNewUser()
            expect(res.status).toBe(200);
            expect(res._body).toBe(true);
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });

    it('Checks authorize is false without token', async () => {
        try {
            await newUser.createNewUser(config.credentials.success);
            const res = await newUser.getAuthorizedOption(config.credentials.success);
            expect(res.status).toBe(200);
            expect(res._body).toBe(false);
        } catch (e) {
            console.log(e);
        }
    });

    it('Checks successfully delete user', async () => {
        try {
            const uid = await newUser.getUserUID();
            const res = await newUser.deleteUser(uid);
            expect(res.status).toBe(200);
            expect(res._body.code).toBe(0);
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });

    it('Checks user can not be deleted before authorization', async () => {
        try {
            const userID = await newUser.createNewUser(config.credentials.success);
            const uid = userID._body.userID;
            const res = await newUser.deleteUser(uid);
            expect(res.status).toBe(401);
            expect(res._body.code).toBe("1200");
            expect(res._body.message).toBe("User not authorized!");
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });

    it('Checks successfully get user info', async () => {
        try {
            const uid = await newUser.getUserUID();
            const res = await newUser.getUserInfo(uid);
            expect(res.status).toBe(200);
            expect(res._body.username).toBe(config.credentials.success.userName);
            expect(res._body.userID).toBe(uid);
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });

    it('Checks unauthorized user info must be error', async () => {
        try {
            const userID = await newUser.createNewUser(config.credentials.success);
            const uid = userID._body.userID;
            const res = await newUser.getUserInfo(uid);
            expect(res.status).toBe(401);
            expect(res._body.code).toBe("1200");
            expect(res._body.message).toBe("User not authorized!");
        } catch (e) {
            console.log(e);
            expect(e).toBeUndefined();
        }
    });
});

