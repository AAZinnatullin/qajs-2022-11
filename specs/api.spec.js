import axios from "axios";
import { expect, it } from "@jest/globals";
import { faker } from '@faker-js/faker';

const userName = faker.name.fullName();

it('Checks user create successfully', async () => {
    const config = {
        method: "POST",
        url: "https://bookstore.demoqa.com/Account/v1/User",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            "userName": `${userName}`,
            "password": "Password21!"
        },
    };
    try {
        const res = await axios(config);
        expect(res.status).toBe(201);
    } catch (e) {
        console.log(e);
    }
});

it('Checks error for create existing users', async () => {
    const config = {
        method: "POST",
        url: "https://bookstore.demoqa.com/Account/v1/User",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            "userName": `${userName}`,
            "password": "Password21!"
        },
    };
    try {
        const res = await axios(config);
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
])('Checks error when user use sipmle password', async (password) => {
    const config = {
        method: "POST",
        url: "https://bookstore.demoqa.com/Account/v1/User",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            "userName": 'New username',
            "password": `${password}`
        },
    };
    try {
        const res = await axios(config);
        expect(res.status).toBe(400);
    } catch (e) {
        expect(e.response.data.message).toBe(
            'Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), ' +
            'one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must ' +
            'be eight characters or longer.');
    }
});

it('Checks error for generation token', async () => {
    const config = {
        method: "POST",
        url: "https://bookstore.demoqa.com/Account/v1/GenerateToken",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            "userName": '',
            "password": 'password'
        },
    };
    try {
        const res = await axios(config);
        expect(res.status).toBe(400);
    } catch (e) {
        expect(e.response.data.message).toBe('UserName and Password required.');
    }
});

it('Checks successfull generated token', async () => {
    const config = {
        method: "POST",
        url: "https://bookstore.demoqa.com/Account/v1/GenerateToken",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: {
            "userName": `${userName}`,
            "password": "Password21!"
        },
    };
    try {
        const res = await axios(config);
        expect(res.status).toBe(200);
        expect(res.data.token).not.toBeNull();
        expect(res.data.result).toBe('User authorized successfully.')
    } catch (e) {
        console.log(e);
    }
});
