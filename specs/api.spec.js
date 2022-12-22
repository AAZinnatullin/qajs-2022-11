import axios from "axios";
import {expect, test} from "@jest/globals";

test('GET request', async () => {
    const config = {
        method: "get",
        url: "https://dummyjson.com/products/1",
    };
    const resp = await axios(config);
    expect(resp.data.title).toBe('iPhone 9');
});

test('POST request', async () => {
    const config = {
        method: "post",
        url: "https://dummyjson.com/products/add",
        headers: "application/json",
        data: {
            "title": "new Title",
            "price": 123
        },
    };
    const resp = await axios(config);
    expect(resp.data.title).toBe('new Title');
    expect(resp.data.price).toBe(123);
    expect(resp.status).toBe(200)
});

test('Check products with auth', async () => {
    const config = {
        method: "get",
        url: "https://dummyjson.com/auth/products/",
    };
    try {
        const resp = await axios(config);
        expect(resp.response.status).toBe(403);
    } catch (e) {
        console.log(e);
    }
});
