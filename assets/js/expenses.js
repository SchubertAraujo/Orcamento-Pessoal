import { DataBase } from "./dataBase.js" 

let database = new DataBase();

class Expenses{
    constructor(year, month, day, type, description, expensesValue ){
        this.year = year
        this.month = month
        this.day = day
        this.type = type
        this.description = description
        this.expensesValue = expensesValue
    }

    fields(nameField, fieldValue){
        let returnFieldsTranslated = ""
        if (fieldValue === ''){
            if (nameField === 'year')
                returnFieldsTranslated = 'Ano'
            else if (nameField === 'month')
                returnFieldsTranslated += 'Mês' 
            else if (nameField === 'day')
                returnFieldsTranslated += 'Dia'
            else if (nameField === 'type')
                returnFieldsTranslated += 'Tipo'
            else if (nameField === 'description')
                returnFieldsTranslated += 'Descrição'
            else if (nameField === 'expensesValue')
                returnFieldsTranslated += 'Valor'
    
        }
        return returnFieldsTranslated;
    }

    blankFields(){
        let returnFields = ''
        for(let exp in this) {
            returnFields = `${returnFields} ${this.fields(exp, this[exp])}`            
        }       
        return returnFields.trim();
    }

    dayValidate(){

        let data
        for(let i = 1; i <= 12; i++){
            if (i === Number(this.month)){
                data = new Date(Number(this.year), i , 0)
                if (data.getDate() < this.day)
                    return true
                else
                    return false
            }           
        }
    }
}

document.getElementById('clickButton')?.addEventListener('click', expensesRegister)
document.getElementById('searchButton')?.addEventListener('click', searchExpenses)


function cleanFields(){
    year.value = ""
    month.value= ""
    day.value= ''
    type.value = ''
    description.value = ''
    expensesValue.value = ''
}

function expensesRegister() {
    let year = document.getElementById("year-select")
    let month= document.getElementById("month-select")
    let day = document.getElementById("day-input")
    let type= document.getElementById("type-select")
    let description= document.getElementById("description-input")
    let expensesValue =document.getElementById("expensesValue")

    var expenses = new Expenses(
        year.value, 
        month.value, 
        day.value, 
        type.value, 
        description.value,
        expensesValue.value);
    
    let blankFields = expenses.blankFields()
    let dayValidate = expenses.dayValidate()
    if (blankFields !== '')
        alert(`Favor preencher os campos obrigatórios ${blankFields}`)
    else if(dayValidate){
        alert('Favor digitar um dia válido')
    }
    else{
        database.post(expenses)
        alert('Dados gravados com sucesso')
        cleanFields()
    }
}

    document.addEventListener('DOMContentLoaded', function loadListExpenses(){
    var expenses = Array()
    expenses = database.getAllRecords();

    insertValuesInRow(expenses)
})

export function insertValuesInRow(expenses){

    var expensesList = document.getElementById('expensesList')
    let sumExpenses = 0
    if (expensesList !== null) {
        expenses.forEach(e => {
            var row = expensesList.insertRow()
            sumExpenses += Number(e.expensesValue)
            row.insertCell(0).innerHTML = `${e.day}/${e.month}/${e.year}`
            row.insertCell(1).innerHTML = e.type
            row.insertCell(2).innerHTML = e.description
            row.insertCell(3).innerHTML = Number(e.expensesValue).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            let removeButton = document.createElement("button")
            removeButton.className = "button-remove style-inputs"
            removeButton.innerHTML = "x"
            removeButton.id = `id_${e.id}`
            removeButton.onclick = () => {
                database.remove(e.id)
                window.location.reload()
            }
            row.insertCell(4).append(removeButton) 
           
        });
        // let sumExpensesFooter = document.getElementById('sumExpensesFooter')
    //     let rowFooter = sumExpensesFooter.insertRow()
       
    //     rowFooter.insertCell(0).innerHTML = ''
    //     rowFooter.insertCell(1).innerHTML = ''
    //     rowFooter.insertCell(2).innerHTML = 'Soma:'
    //     rowFooter.insertCell(3).innerHTML = sumExpenses.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    document.getElementById('totalValue').innerHTML = sumExpenses.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
    }
}


function searchExpenses(){
   
    let year = document.getElementById("year-select").value
    let month= document.getElementById("month-select").value
    let day = document.getElementById("day-input").value
    let type= document.getElementById("type-select").value
    let description = document.getElementById("description-input").value
    let expensesValue = document.getElementById("expensesValue").value

    var expenses = new Expenses(
        year, 
        month, 
        day, 
        type, 
        description,
        expensesValue);
    
    database.search(expenses)
}
