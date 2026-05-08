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
console.log('TYPES')
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



