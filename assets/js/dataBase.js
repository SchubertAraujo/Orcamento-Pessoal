import { insertValuesInRow } from './expenses.js'
export class DataBase{

    constructor(){
        let id = localStorage.getItem("id")
        if (id === null){
            localStorage.setItem("id", 0)
        }
    }

    getNextId() {
        let nextId = localStorage.getItem("id")
        return parseInt(nextId) + 1
    }

    post(expenses){
        let id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(expenses))
        localStorage.setItem("id", id)
    }

    getAllRecords(){
        let expensesArray = Array()
        // quando colocado " "(entre aspas) é recuperado o id atual
        // e quando colocado fora de aspas é recuperado o JSON com as informarçoes
        let currentId = localStorage.getItem('id')
        for(let i = 1; i <= currentId; i++){
            let expenseObj = JSON.parse(localStorage.getItem(i))
            
            if (expenseObj === null ){
                continue
            }

            expenseObj.id = i
            expensesArray.push(expenseObj)
            
        }
        return expensesArray    
    }

    remove(id){
        localStorage.removeItem(id)
    }

    search(expenses){    
        let expensesArray = Array()
        expensesArray = this.getAllRecords();
        var expensesList = document.getElementById('expensesList')

        expensesList.innerHTML = ''

        let expensesFiltered = expensesArray
        if (expenses.year != ''){
            expensesFiltered = expensesArray.filter( filter => {
                return filter.year == expenses.year
        })}
        if (expenses.month != ''){
            expensesFiltered = expensesArray.filter( filter => {
                return filter.month == expenses.month
        })}
        if (expenses.day != ''){
            expensesFiltered = expensesArray.filter( filter => {
                return filter.day == expenses.day
        })}
        if (expenses.type != ''){
            expensesFiltered = expensesArray.filter( filter => {
                return filter.type == expenses.type
        })}
        if (expenses.description != ''){
            expensesFiltered = expensesArray.filter( filter => {
                return filter.description == expenses.description
        })}
        if (expenses.expensesValue != ''){
            expensesFiltered = expensesArray.filter( filter => {
                return filter.expensesValue == expenses.expensesValue
        })}

        insertValuesInRow(expensesFiltered)   
    }
}