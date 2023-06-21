import { Person } from "./Person.js"
import { Student } from "./Student.js";
import { Employee } from "./Employee.js";
import { Customer } from "./Customer.js";
import { ChangeToSlug } from "../javascripts/Utilities/checkInput.js";

export class ListPerson{
    arrPerson = [];
    addPerson(person){
        if(person instanceof Person){
            this.arrPerson.push(person);
            return true;
        }
        else{
            return false;
        }
    }
    initListPerson(persons){
        persons.forEach(person => {
            this.arrPerson.addPerson(person);
        });
    }
    getPersonById(id){
        let index = this.arrPerson.findIndex((person) =>person.id==id);
        if(index!=-1){
            return this.arrPerson[index];
        }
        else{
            return false;
        }
    }
    deletePerson(idDelete){
        let indexDelete = this.arrPerson.findIndex((person)=>person.id == idDelete);
        if(indexDelete!==-1){
            this.arrPerson.splice(indexDelete,1);
            return true;
        }
        else{
            return false;
        }
    }
    filterPersonByType(type){
        let filterArr = [];
        switch (type){
            case 'Employee':{
                this.arrPerson.forEach((person)=>{
                    if(person instanceof Employee){
                        filterArr.push(person);
                    }
                },[]);
                return filterArr; 
            }
            case 'Customer':{
                this.arrPerson.forEach((person)=>{
                    if(person instanceof Customer){
                        filterArr.push(person);
                    }
                },[]);
                return filterArr; 
            }
            case 'Student':{
                this.arrPerson.reduce((arr,person)=>{
                    if(person instanceof Student){
                        filterArr.push(person);
                    }
                },[]);
                return filterArr; 
            }
            case 'All':{
                return this.arrPerson;
            }
        }
    }
    searchByName(searchTxt){
        let slugTxt = ChangeToSlug(searchTxt);
        return this.arrPerson.reduce((arr,person)=>{
            if(ChangeToSlug(person.name).search(slugTxt)!==-1){
                arr.push(person);
            }
            console.log('tim',arr);
            return arr;
        },[]);
        
    }
}