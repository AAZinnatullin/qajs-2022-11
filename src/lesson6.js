function personalData(name, surname, age) {
    return `Name: ${name}. Surname: ${surname}. Age: ${age}`;
}

const personalInfo = personalData('Ivan', 'Test', 21);
console.log(personalInfo);

const name = 'Ivan';
const surname = 'Test';
const age = 21;

const userData = {
  name: name,
  surname: surname,
  age: age,
};

const printUserData = (userData) => {
    return `Name: ${userData.name}. Surname: ${userData.surname}. Age: ${userData.age}`;
}

console.log(printUserData(userData));

const user = {
    name: 'Aloe',
    surname: 'Hello',
    age: 21,
    showInfo() {
        return `Name: ${this.name}. Familia: ${this.surname}. Age: ${this.age}`;
    },
};

console.log(user);
console.log(user.showInfo());

const arr = [100, 200, 300];

for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
}

console.log(arr);
