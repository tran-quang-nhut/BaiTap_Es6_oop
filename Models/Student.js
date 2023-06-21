import { Person } from "./Person.js";
export class Student extends Person{
    toan = 0;
    ly = 0;
    hoa = 0;
    type = 'Student';
    constructor(name,adress,id,email,toan,ly,hoa){
        super(name,adress,id,email);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
    }
    getAverange(){

        return ((this.toan+ this.ly+this.hoa)/3).toFixed(2);
    }
}