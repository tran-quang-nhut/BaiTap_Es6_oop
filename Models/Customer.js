import { Person } from "./Person.js";
export class Customer extends Person{
    companyName = '';
    bill = 0;
    evalute = '';
    type = 'Customer';
    constructor(name,adress,id,email,companyName,bill,evaluate){
        super(name,adress,id,email);
        this.companyName = companyName;
        this.bill = bill;
        this.evaluate = evaluate;
    }
}