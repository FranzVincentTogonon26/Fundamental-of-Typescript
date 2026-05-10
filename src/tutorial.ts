
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

interface genericInterface<T> {
    value: T;
    getValue: () => T;
}
 
const genericString : genericInterface<string> = {
    value: 'Hello World',
    getValue(){
        return this.value
    }
}

console.log(genericString)

console.log('----------------------------------------------------------------------------') 


function generateStringArray( length: number, value: string ) : string[] {
    return Array(length).fill(value)
}

console.log(generateStringArray(4, 'franz'))

console.log('----------------------------------------------------------------------------') 

function createArray<T>( length: number, value: T ) : Array<T>{
    return Array(length).fill(value)
}

console.log(createArray<string>(3, 'franz'))
console.log(createArray<number>(2, 100))

console.log('----------------------------------------------------------------------------') 

function processValue<T extends string | number>( value: T) : T {
    console.log(value)
    return value
}

processValue('hello')
processValue(2)


console.log('----------------------------------------------------------------------------') 

type Car = {
    brand: string;
    model: string;
}

const car : Car = {
    brand: 'ford',
    model: 'mustang'
}

type Product = {
    name: string;
    price: number;
}

const product : Product = {
    name: 'shoes',
    price: 450
}

type Student1 = {
    name: string;
    age: number;
}

const student1 : Student1 = {
    name: 'franz',
    age: 30
}

function printName<T extends { name: string} >( value: T) : void { // you can also use UNION extends Student1 | Products
    console.log(value.name)
    return 
}

printName(student1)
printName(product)

console.log('----------------------------------------------------------------------------') 


interface StoreData<T = any> {
    data: T[]
}

const storeNumber : StoreData<number> = {
    data: [1,2,3,4,5]
}

const randomStuff : StoreData = {
    data: ['franz', 1]
}

console.log('----------------------------------------------------------------------------') 


const url = 'https://www.course-api.com/react-tours-project';

// WITHOUT TYPESCRIPT

// async function fetchData( url: string){
//     try {
//         const response = await fetch(url)

//         if(!response.ok){
//             throw new Error(`HTTP error status: ${response.status}`)
//         }
//         const data = await response.json();
//         return data
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : ' there was an error'
//         console.log(errorMessage)
//         return []
//     }
// }

// const tours = await fetchData(url)
// tours.map(( tour: any ) => {
//     console.log(tour.name)
// })

type Tour1 = {
    id: string;
    name: string;
    info: string;
    image: string;
    price: string;
}

async function fetchData1( url: string ) : Promise<Tour1[]>{
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`HTTP Error, Status: ${response.status}`)
        }
        const data : Tour1[] = await response.json()
        return data;
    } catch (error) {
       const errorMessage =  error instanceof Error ? error.message : 'there was an error'
       console.log(errorMessage)
       return []
    }
}

const tours1 = await fetchData1(url)
tours1.map(( tour ) => {
    console.log(tour.name)
})

console.log('----------------------------------------------------------------------------') 

// Using ZOD


import { number, z } from 'zod'

const tourSchema = z.object({
    id: z.string(),
    name: z.string(),
    info: z.string(),
    image: z.string(),
    price: z.string(),
})

type Tour = z.infer<typeof tourSchema>

async function fetchData( url: string ) : Promise<Tour[]>{
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`HTTP Error, Status: ${response.status}`)
        }
        const rawData : Tour[] = await response.json()
        const result = tourSchema.array().safeParse(rawData)

        if(!result.success){
            throw new Error(`Invalid Data: ${result.error}`)
        }
        return result.data;
    } catch (error) {
       const errorMessage =  error instanceof Error ? error.message : 'there was an error'
       console.log(errorMessage)
       return []
    }
}

const tours = await fetchData(url)
tours.map(( tour ) => {
    console.log(tour.name)
})


console.log('----------------------------------------------------------------------------') 

class Book {

    public readonly pamagat: string
    public name: string
    private checkOut: boolean = false
    
    constructor( title: string, author: string ){
        this.pamagat = title
        this.name = author
    }
    
    public isCheckOut(){
        return this.checkOut
    }

    public  callMethodCheckOut(){
        this.checkOut = this.toggleCheckedStatus()
    }


    private toggleCheckedStatus(){
        return !this.checkOut
    }
}

const deepWork = new Book('Programming', 'franz')
// invote the method
deepWork.callMethodCheckOut()

console.log(deepWork.isCheckOut())

// deepWork.callMethodCheckOut()

// console.log(deepWork)
// console.log(deepWork.pamagat)

console.log('----------------------------------------------------------------------------') 

// Using GETTERS and SETTERS

class Book2 {

    private checkMate: boolean = false

    constructor(
        readonly title: string,
        public author: string,
        // private someValue: number -> you can add parameters here
    ){}

    // public getSomeValue(){
    //     return this.someValue
    // }

    get info(){
        return `${this.title} by ${this.author}`
    }

    set checkOut( checkOutValue: boolean ){
         this.checkMate = checkOutValue
    }
}

const deepWork2 = new Book2('Programming', 'franzTogonon')

// console.log(deepWork2.getSomeValue())

console.log(deepWork2.info)

deepWork2.checkOut = true
console.log(deepWork2)

console.log('----------------------------------------------------------------------------') 

interface IPerson {
    name: string;
    age: number;
    // greet(): void
}

class Person implements IPerson {
    constructor(
        public name: string,
        public age: number
    ){}

    greet(): void {
        console.log(`My name is ${this.name} my age ${this.age} years`)
    }
}

const hipster = new Person('FranzVincentTogonon', 30)

hipster.greet()