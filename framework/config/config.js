import { userName, password } from "../fixtures/fixtures.js";

const config = {
    baseUrl: "https://bookstore.demoqa.com/Account/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    credentials: {
        success: {
            "userName": `${userName}`,
            "password": `${password}`,
        },
        static: {
            "userName": 'test',
            "password": 'Password12!',
        },
    },
};

export default config;