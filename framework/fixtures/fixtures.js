import { faker } from '@faker-js/faker';

export const userName = faker.name.fullName();
export const password = faker.internet.password(8, false, /[A-z0-9]/, '!aA2');