
// SOURCE REFERENCE = https://github.com/john-smilga/typescript-course

function processData( 
        input: number | string, 
        config: { reverse: boolean } = { reverse: false } 
    ) : number | string {
        if( typeof input === 'number'){
            return input * input
        } else {
            return config.reverse? input.toUpperCase().split('').reverse().join('') : input.toUpperCase()
        }
    }

console.log(processData(1))
console.log(processData('test', { reverse: true }))
console.log(processData('test'))


console.log('----------------------------------------------------------------------------')
console.log('TYPES ALIAS')
console.log('----------------------------------------------------------------------------')


type Employee = {
    id: number;
    name: string;
    department: string;
}

type Manager1 = {
    id: number;
    name: string;
    employees: Employee[]
}

type Staff = Employee | Manager1

function printStaffDetails( staff: Staff ){
    if( 'employees' in staff ){
        return `Manager ${staff.name} total employee ${staff.employees.length}`
    } else {
        return `Name ${staff.name} at department ${staff.department}`
    }
}

const alice : Employee = {
    id: 1,
    name: 'alice',
    department: 'Sales'
}

const bob : Manager1 = {
    id: 1,
    name: 'bob',
    employees: [alice]
}

console.log(printStaffDetails(alice))
console.log(printStaffDetails(bob))


console.log('----------------------------------------------------------------------------')
console.log('INTERFACES')
console.log('----------------------------------------------------------------------------')


interface Computer {
    readonly id: number;
    brand: string;
    ram: number;
    storage?: number;
    upGradeRam: (size: number) => number
}

const personalPC: Computer = {
    id: 123,
    brand: 'Macbook Pro',
    ram: 128,
    storage: 4,
    upGradeRam: (size) => {
        return personalPC.ram + size;
    }
}

const result = personalPC.upGradeRam(100)

console.log(result)


console.log('----------------------------------------------------------------------------')

interface Person {
    name: string;
}

interface Dogowner extends Person {
    DogOwner: string;
}

interface Manager extends Person {
    managePeople(): void;
    delegateTasks(): void;
}


function getEmployee() : Person | Dogowner | Manager {
    const randomNumber = Math.random();
    if(randomNumber < 0.33){
        return {
            name: 'franz'
        }
    } else if(randomNumber < 0.66){
        return {
            name: 'Jen',
            DogOwner: 'Grey'
        }
    } else {
        return {
            name: 'Togonon',
            managePeople() {
                console.log('Manager')
            },
            delegateTasks() {
                console.log('Delegating task..')
            },
        }
    }
}

const employee : Person | Dogowner | Manager = getEmployee();

console.log(employee)

function isManger( obj: Person | Dogowner | Manager ) : obj is Manager{
    return 'managePeople' in obj
}


if(isManger(employee)){
    employee.delegateTasks()
}



console.log('----------------------------------------------------------------------------')


enum UserRole  {
    Admin = 'admin',
    Manager = 'manager',
    Employee = 'employee'
}

type User = {
    id: number;
    name: string;
    role: UserRole;
    contact: [ email: string, phone: string ]
}

function createUser( user: User ) : User {
    return user
}

const user : User = {
    id: 1,
    name: 'franz',
    role: UserRole.Admin,
    contact: [ 'franz@gmail.com', '099834']
}

console.log(createUser(user))

console.log('----------------------------------------------------------------------------')    

type ValueType = string | number | boolean

let value: ValueType

const random = Math.random()
value = random < 0.33 ? 'Hello' : random < 0.66 ? 123.456 : true

function checkValue( value: ValueType ) : void {
    if( typeof value === 'string'){
        console.log( value.toLowerCase() )
        return
    } else if( typeof value === 'number'){
        console.log( value.toFixed(2))
        return
    } else {
        console.log(`Boolean: ${value}`)
        return
    }
}

checkValue(value)

console.log('----------------------------------------------------------------------------') 


type Dog = {
    type: 'dog';
    name: string;
    bark: () => void
}
type Cat = {
    type: 'cat';
    name: string;
    meow: () => void
}

type Animal = Dog | Cat

// function makeSound( animal: Animal ){
//     if( animal.type === 'dog'){
//         animal.bark()
//     } else {
//         animal.meow()
//     }
// }

function makeSound( animal: Animal ){
    if( 'bark' in animal){
        animal.bark()
    } else {
        animal.meow()
    }
}

console.log('----------------------------------------------------------------------------') 

type Student = {
    name: string;
    study: () => void
}

type User1 = {
    name: string;
    login: () => void
}

type Person1 = Student | User1

const randomPerson = () : Person1 => {
    return Math.random() > 0.5 ? { name: 'franz', study: () => console.log('Studying..')} : { name: 'jen', login: () => console.log('Loging in')}
}

const person = randomPerson()

function isStudent( person: Person) : person is Student{
    return ( person as Student ).study !== undefined
}

if(isStudent(person)){
    person.study()
} else {
    person.login()
}

console.log('----------------------------------------------------------------------------') 

type IncrementAction = {
    type: 'increment';
    amount: number;
    timestamp: number;
    user: string;
}
type DecrementAction = {
    type: 'decrement';
    amount: number;
    timestamp: number;
    user: string;
}

type Action = IncrementAction | DecrementAction

function reducer( state: number, action: Action){
    switch (action.type){
        case 'increment':
            return state + action.amount
        case 'decrement':
            return state - action.amount
        default: {
            const unexpectedAction: never = action;
            throw new Error(`Unexpected Action ${unexpectedAction}`)
        }
    }
}

const newState = reducer(5, {
    type: 'decrement',
    amount: 2,
    timestamp: 1213,
    user: 'franz'
})

console.log(newState)

console.log('----------------------------------------------------------------------------') 