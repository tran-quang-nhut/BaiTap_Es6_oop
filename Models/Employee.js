import { Person } from "./Person.js";
export class Employee extends Person{
    dayWork = 0;
    salary = 0;
    type = 'Employee';
    constructor(name,adress,id,email,dayWork,salary){
        super(name,adress,id,email);
        this.dayWork = dayWork;
        this.salary = salary;
    }
    getEarn(){
        return this.dayWork*this.salary;
    }
    
}