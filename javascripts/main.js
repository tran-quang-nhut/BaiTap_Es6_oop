import {
    Person
} from "../Models/Person.js";
import {
    Student
} from "../Models/Student.js";
import {
    Customer
} from "../Models/Customer.js";
import {
    ListPerson
} from "../Models/ListPerson.js";
import {
    Employee
} from "../Models/Employee.js";
import {
    nullValidate,
    emailValidate,
    passwordValidate,
    nameValidate,
    idValidate,
    numberValidate,
    scoreValidate,
    ChangeToSlug
} from './Utilities/checkInput.js';



window.onload = () => {

    let arrPerson = new ListPerson();

    let listDetailPanel = document.querySelectorAll('.detail-infor');

    document.querySelector('#type').onchange = (e) => {
        let userType = e.target.value;
        if (userType == '') {
            listDetailPanel.forEach(panel => {
                panel.style.display = 'none';
            });
        } else {
            listDetailPanel.forEach(panel => {
                panel.style.display = 'none';
            });
            document.querySelector(`#${userType}_infor`).style.display = 'flex';
        }
    }
    document.querySelector('#close_panel').onclick = () => {
        document.querySelector('.addPanel').style.display = 'none';
    }
    document.querySelector('#add_button').onclick = () => {
        document.querySelector('#person_form').reset();
        document.querySelector('#edit_button').style.display = 'none';
        document.querySelector('#add_button').style.display = 'block';
        resetPanelDetail();
        document.querySelector('#person_form #type').removeAttribute('disabled');
        document.querySelector('#person_form #id').removeAttribute('disabled');
        console.log(document.querySelector('#person_form #type'));
        document.querySelector('.addPanel').style.display = 'flex';
    }
    document.querySelector('#submit_button').onclick = (e) => {
        let listInput = document.querySelectorAll('#person_form input,select,textarea');
        let inputs = [];
        listInput.forEach((input) => {
            let {
                id,
                value
            } = input;
            inputs[id] = value;
        });
        let validate = getValidateInput(inputs);


        if (validate) {
            let idCheck = true;
            if (inputs.id !== null) {
                arrPerson.arrPerson.forEach(person => {
                    if ((person.id === inputs.id)) {
                        idCheck = false;
                    }
                });
                document.querySelector('#id_error').innerHTML = (idCheck ? '' : 'ID đã tồn tại');
            }
            validate = idCheck;
            if (!validate) return;
        } else {
            return;
        }
        getLocalStorange();
        let personCreate = createPerson(inputs);
        console.log(personCreate);
        if (personCreate) arrPerson.addPerson(personCreate);
        setLocalStorange();
        renderPerson(arrPerson.arrPerson);
        resetPanelDetail();
        document.querySelector('#person_form').reset();
    }
    document.querySelector('#edit_button').onclick = (e) => {
        let listInput = document.querySelectorAll('#person_form input,select,textarea');
        let inputs = [];
        listInput.forEach((input) => {
            let {
                id,
                value
            } = input;
            inputs[id] = value;
        });
        let validate = getValidateInput(inputs);
        if (validate) {
            let editPerson = createPerson(inputs);
            let indexEdit = arrPerson.arrPerson.findIndex(person => person.id == editPerson.id);
            arrPerson.arrPerson.splice(indexEdit, 1, editPerson);
            setLocalStorange();
            getLocalStorange();
            renderPerson(arrPerson.arrPerson);
            document.querySelector('.addPanel').style.display = 'none'
            document.querySelector('#Customer_infor').style.display = 'none'
            document.querySelector('#Employee_infor').style.display = 'none'
            document.querySelector('#Student_infor').style.display = 'none'
            document.querySelector('#submit_button').style.display = 'block';
            document.querySelector('#edit_button').style.display = 'none';
            document.querySelector('#person_form').reset();      
        }
    }
    document.querySelector('#filter_type').onchange =(e)=>{
        getLocalStorange();
        arrPerson.arrPerson = arrPerson.filterPersonByType(e.target.value);
        renderPerson(arrPerson.arrPerson);
        if(e.target.value =='All'){
            document.querySelector('#filter_button').style.color = 'white';
        }
        else{
            document.querySelector('#filter_button').style.color = 'red';
        }
        e.target.style.display = 'none';
    }
    document.querySelector('#filter_button').onclick = ()=>{
        document.querySelector('#filter_type').style.display = 'block';
    }
    document.querySelector('#search').onsubmit = (e)=>{
        e.preventDefault();
        let txt = document.querySelector('#search_input').value;
        let arrSearch = arrPerson.searchByName(txt);
        renderPerson(arrSearch);
    }
    document.querySelector('#search_input').oninput = (e)=>{
        console.log('change');
        let txt = e.target.value;
        let arrSearch = arrPerson.searchByName(txt);
        renderPerson(arrSearch);
    }


    function setLocalStorange() {
        localStorage.setItem('listPerson', JSON.stringify(arrPerson.arrPerson));
    }

    function getLocalStorange() {
        arrPerson.arrPerson = [];
        let arrJson = localStorage.getItem('listPerson');
        if (arrJson) {
            let persons = JSON.parse(arrJson);
            persons.forEach(person => {
                switch (person.type) {
                    case 'Student': {
                        let student = new Student();
                        student = Object.assign(student, person);
                        arrPerson.addPerson(student);
                        break;
                    }
                    case 'Customer': {
                        let customer = new Customer();
                        customer = Object.assign(customer, person);
                        arrPerson.addPerson(customer);
                        break;
                    }
                    case 'Employee': {
                        let employee = new Employee();
                        employee = Object.assign(employee, person);
                        arrPerson.addPerson(employee);
                        break;
                    }
                    default: {
                        break;
                    }

                }
            });
            return true;
        } else {
            return false;
        }
    }

    function renderPerson(arrPerson) {
        let html = '';
        console.log(arrPerson);
        arrPerson.forEach(person => {
            let personalInfor = '';
            if (person instanceof Student) {
                personalInfor = `Điểm trung bình: ${person.getAverange()}`;
            } else if (person instanceof Employee) {
                personalInfor = `Tiền lương: ${person.getEarn()} vnđ`;
            } else if (person instanceof Customer) {
                personalInfor = `Công ty: ${person.companyName}`;
            }

            html += `
            <tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.email}</td>
            <td>${person.type}</td>
            <td>${personalInfor}</td>
            <td><button class='btnDelete' onclick ="deletePerson('${person.id}')">delete</button><button style="margin-left: 10px;" class='btnEdit' onclick = "editPerson('${person.id}')">Chỉnh sửa</button></td>
          </tr>
            `;
        })
        document.querySelector('#table_content').innerHTML = html;
    }

    function createPerson(inputs) {
        let typePerson = inputs.type;
        let personCreate;
        switch (typePerson) {
            case 'Student': {
                personCreate = new Student(inputs.name, inputs.adress, inputs.id, inputs.email, parseInt(inputs.toan), parseInt(inputs.ly), parseInt(inputs.hoa));
                break;
            }
            case 'Customer': {
                personCreate = new Customer(inputs.name, inputs.adress, inputs.id, inputs.email, inputs.companyName, parseFloat(inputs.bill), parseFloat(inputs.evaluate));
                break;
            }
            case 'Employee': {
                personCreate = new Employee(inputs.name, inputs.adress, inputs.id, inputs.email, parseInt(inputs.dayWork), parseInt(inputs.salary));
                break;
            }
            default: {
                break;
            }
        }
        return personCreate;
    }

    function getValidateInput(inputs) {

        let validate = (nullValidate(inputs.id, 'id') ? idValidate(inputs.id, 'id') : false) & (nullValidate(inputs.name, 'name') ? (nameValidate(inputs.name, 'name')) : false) & (nullValidate(inputs.adress, 'adress')) & (nullValidate(inputs.email, 'email') ? emailValidate(inputs.email, 'email') : false) & (nullValidate(inputs.type, 'type'));
        console.log('1', validate);
        if (inputs.type == 'Employee') {
            validate = (numberValidate(inputs.dayWork, 'dayWork') & numberValidate(inputs.salary, 'salary'));
        }
        if (inputs.type == 'Student') {
            validate = validate & (numberValidate(inputs.toan, 'toan') ? scoreValidate(inputs.toan, 'toan') : false) & (numberValidate(inputs.ly, 'ly') ? scoreValidate(inputs.ly, 'ly') : false) & (numberValidate(inputs.hoa, 'hoa') ? scoreValidate(inputs.hoa, 'hoa') : false);
        }
        if (inputs.type == 'Customer') {
            validate = validate & (nullValidate(inputs.companyName, 'companyName') ? nameValidate(inputs.companyName, 'companyName') : false) & (numberValidate(inputs.bill, 'bill'));
        }
        console.log('Validate', validate);
        return validate;
    }

    window.setValueForm = (person)=>{
        let inputs = document.querySelectorAll('#person_form input,select,textarea');
        console.log(person);
        document.querySelector('.addPanel').style.display = 'flex';
        inputs.forEach(input => {
            let {
                id,
                value
            } = input;
            input.value = person[id];
        });
        document.querySelector(`#person_form #${person.type}_infor`).style.display = 'flex';
    }

    window.deletePerson = (id) => {
        let person = arrPerson.getPersonById(id);
        if (arrPerson.deletePerson(id)) {
            if (confirm(`Xác nhận xóa ${person.name}`)) {
                setLocalStorange();
                getLocalStorange();
                renderPerson(arrPerson.arrPerson);
                alert(`Bạn đã Xóa thành công!`);
                return;
            } else {
                alert('Bạn có muốn Hủy xóa!');
                getLocalStorange();
                renderPerson(arrPerson.arrPerson);
                return;
            }
        } else {
            alert('Bạn đã Xóa thất bại!');
            return;
        }
    }

    window.editPerson = (id) => {
        let personEdit = arrPerson.getPersonById(id);
        resetPanelDetail();
        setValueForm(personEdit);
        document.querySelector('#person_form #id').setAttribute('disabled', true);
        document.querySelector('#person_form #type').setAttribute('disabled', true);
        document.querySelector('#edit_button').style.display = 'block';
        document.querySelector('#submit_button').style.display = 'none';
    }

    window.resetPanelDetail=()=>{
        document.querySelector('#Customer_infor').style.display = 'none'
        document.querySelector('#Employee_infor').style.display = 'none'
        document.querySelector('#Student_infor').style.display = 'none'
    }
    window.sortByName=(value)=>{
        arrPerson.arrPerson.sort((person1,person2)=>{
            let alias1 = ChangeToSlug(person1.name);
            let alias2 = ChangeToSlug(person2.name);
            if(value ==1){
                if(alias1>alias2)return -1;
                if(alias1<alias2)return 1;
                return 0;
            }
            if(value ==2){
                if(alias1>alias2)return 1;
                if(alias1<alias2)return -1;
                return 0;
            }
        });
        renderPerson(arrPerson.arrPerson);
        document.querySelectorAll('table .sort').forEach(but=>{but.style.color='black'})
        document.querySelector(`table #sort_${value}`).style.color = 'red';
        
    }
    getLocalStorange();
    console.log(arrPerson);
    renderPerson(arrPerson.arrPerson);
}